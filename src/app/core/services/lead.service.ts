import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Import Firestore
import { LeadData } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private firestore = inject(Firestore); // Inject Firestore
  private googleScriptUrl = environment.googleScriptUrl;

  async submitLead(data: LeadData) {
    // 1. Save to Firebase (For Admin Dashboard)
    try {
      const leadsRef = collection(this.firestore, 'leads');
      await addDoc(leadsRef, {
        ...data,
        timestamp: new Date(), // Add server timestamp
        status: 'new' // Mark as unread
      });
      console.log("Lead saved to Firestore");
    } catch (e) {
      console.error("Error saving to Firestore:", e);
    }

    // 2. Send to Google Sheets (For Email Automation)
    if (!this.googleScriptUrl || this.googleScriptUrl.includes('YOUR_GOOGLE')) {
      console.error('Google Script URL is missing');
      return;
    }

    return fetch(this.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}