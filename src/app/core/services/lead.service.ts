import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { LeadData } from '../models/models';
import { environment } from '../../../environments/environment';
import { withTimeout } from '../utils/with-timeout';

// How long the form waits for each destination before giving up on it.
// A Firestore write that times out stays queued in the offline cache and is
// still sent when the connection comes back.
const FIRESTORE_TIMEOUT_MS = 10_000;
const SHEET_TIMEOUT_MS = 15_000;

@Injectable({ providedIn: 'root' })
export class LeadService {
  private firestore = inject(Firestore);
  private googleScriptUrl = environment.googleScriptUrl;

  /**
   * Saves the lead to Firestore (admin record) and sends it to Google Apps Script
   * (Sheet + email automation) in parallel. Resolves if at least one succeeds, so the
   * lead is never lost silently; rejects only when both fail or time out.
   */
  async submitLead(data: LeadData): Promise<void> {
    const results = await Promise.allSettled([
      withTimeout(this.saveToFirestore(data), FIRESTORE_TIMEOUT_MS, 'Saving lead to Firestore'),
      this.sendToSheet(data)
    ]);

    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(i === 0 ? 'Error saving lead to Firestore:' : 'Error sending lead to Google Sheet:', r.reason);
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

  private async sendToSheet(data: LeadData) {
    if (!this.googleScriptUrl || this.googleScriptUrl.includes('YOUR_GOOGLE')) {
      throw new Error('Google Script URL is missing');
    }
    // Apps Script doesn't answer CORS preflights, so this is a "simple" no-cors request:
    // the response is opaque, but a network failure or timeout still rejects.
    // (no-cors only allows a text/plain body; the script reads it with JSON.parse.)
    await fetch(this.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(SHEET_TIMEOUT_MS)
    });
  }
}
