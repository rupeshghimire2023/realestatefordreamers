import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; //only for local testing remove when checking in

@Injectable({ providedIn: 'root' })
export class GeminiService {
  // We point to the relative path of our Netlify function
  // In development (ng serve), we need a proxy (see Step 4 below) or full URL if testing live.
  // When deployed, this relative path works automatically.
  private apiUrl = '/.netlify/functions/chat';


   // TODO: Paste your Gemini API Key here
  // private apiKey = environment.geminiApiKey; // Use variable
  // private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`; //only for local testing remove when checking in
  async sendMessage(userText: string): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText }) // We only send the text now
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      
      const result = await response.json();
      return result.reply || "I'm having trouble connecting right now.";
      
    } catch (error) {
      console.error("Chatbot Error:", error);
      return "I'm currently offline or having connection issues. Please try again later.";
    }
  }
}