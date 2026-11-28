import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { LeadData } from '../models/models';
import { withTimeout } from '../utils/with-timeout';

// How long the form waits for each destination before giving up on it.
// A Firestore write that times out stays queued in the offline cache and is
// still sent when the connection comes back.
const FIRESTORE_TIMEOUT_MS = 10_000;
const EMAIL_TIMEOUT_MS = 15_000;

export interface LeadOptions {
  /** Value of the form's hidden spam-trap field. People leave it empty. */
  honeypot?: string;
}

@Injectable({ providedIn: 'root' })
export class LeadService {
  private firestore = inject(Firestore);

  /**
   * Saves the lead to Firestore (admin record) and sends it to /api/lead, which
   * forwards it to Google Apps Script (Sheet + email automation), in parallel.
   * Resolves if at least one succeeds, so the lead is never lost silently;
   * rejects only when both fail or time out.
   */
  async submitLead(data: LeadData, options: LeadOptions = {}): Promise<void> {
    // The spam trap was filled in, so this is a bot: pretend it worked, send nothing.
    if (options.honeypot?.trim()) return;

    const results = await Promise.allSettled([
      withTimeout(this.saveToFirestore(data), FIRESTORE_TIMEOUT_MS, 'Saving lead to Firestore'),
      this.sendToEmailAutomation(data)
    ]);

    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(i === 0 ? 'Error saving lead to Firestore:' : 'Error sending lead to /api/lead:', r.reason);
      }
    });

    if (results.every(r => r.status === 'rejected')) {
      throw new Error('Lead could not be delivered');
    }
  }

  private async saveToFirestore(data: LeadData) {
    await addDoc(collection(this.firestore, 'leads'), {
      ...data,
      timestamp: serverTimestamp(),
      status: 'new'
    });
  }

  // Netlify function (netlify/functions/lead.mts). Only exists on Netlify or under
  // `netlify dev`; with plain `ng serve` this fails and the Firestore copy is used.
  private async sendToEmailAutomation(data: LeadData) {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS)
    });
    if (!res.ok) throw new Error(`/api/lead returned ${res.status}`);
  }
}
