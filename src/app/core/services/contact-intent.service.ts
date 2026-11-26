import { Injectable, signal } from '@angular/core';
import { LeadInterest } from '../models/models';

export interface ContactIntent {
  interest: LeadInterest;
  message?: string;
}

/**
 * Carries a "contact me about X" request (from the hero, the services cards or a
 * listing page) to the contact form. The form lives in a deferred block, so it
 * may not exist yet when the request is made; it picks the request up when it
 * is created instead of the caller having to wait for it with timers.
 */
@Injectable({ providedIn: 'root' })
export class ContactIntentService {
  private readonly _pending = signal<ContactIntent | null>(null);
  readonly pending = this._pending.asReadonly();

  request(intent: ContactIntent) {
    // A new object every time, so repeating the same request still notifies.
    this._pending.set({ ...intent });
  }

  clear() {
    this._pending.set(null);
  }
}

/** Maps an untrusted value (e.g. a ?interest= query param) to a form option. */
export function toLeadInterest(value: string | null | undefined): LeadInterest {
  return value === 'buying' || value === 'selling' ? value : 'other';
}
