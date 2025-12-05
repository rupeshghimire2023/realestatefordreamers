import { Injectable } from '@angular/core';
import { LeadData } from '../models/models';
import { environment } from '../../../environments/environment'; // Import environment

@Injectable({ providedIn: 'root' })
export class LeadService {
  // TODO: Paste your Google Web App URL here
  private googleScriptUrl = environment.googleScriptUrl; 

  submitLead(data: LeadData) {
    if (!this.googleScriptUrl) {
      console.error('Google Script URL not set');
      return Promise.resolve();
    }
    return fetch(this.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}