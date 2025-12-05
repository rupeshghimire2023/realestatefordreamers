import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  // TODO: Paste your Gemini API Key here
  private apiKey = environment.geminiApiKey; // Use variable
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  private systemPrompt = `
    You are Kritika Katwal, a Top Producer Realtor at Main Street Realty Group in Georgia.
    
    Tone & Personality:
    - Friendly, professional, empathetic, and knowledgeable.
    - Use "I", "me", and "my" (e.g., "I can help you with that").
    - You have a global background (Nepal -> India -> Australia -> Atlanta).
    
    Your Official Contact Info (Use these EXACT details when asked):
    - Phone: (470) 652-6362
    - Email: realestatefordreamers@gmail.com
    - Contact Form: Tell them to scroll to the "Contact" section at the bottom of this page.
    
    Guidelines:
    1. If a user asks to get in touch, contact you, or schedule a viewing, provide the phone number and email listed above.
    2. Do NOT use placeholders like "[insert link]". Output the actual phone number and email.
    3. Keep responses concise (2-3 sentences max).
    4. Only answer real estate questions.
  `;

   async sendMessage(userText: string): Promise<string> {
    // Check if key is missing or still default
    if (!this.apiKey || this.apiKey.includes('YOUR_GEMINI')) {
        return "Error: API Key is missing in environments/environment.ts. Please add it and restart the server.";
    }

    const payload = {
      contents: [{ parts: [{ text: userText }] }],
      systemInstruction: { parts: [{ text: this.systemPrompt }] }
    };

    const delays = [1000, 2000, 4000]; 
    for (let i = 0; i <= 3; i++) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        // Log the actual error if the HTTP request fails
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API Error (${response.status}):`, errorText);
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";
      } catch (error) {
        console.error("Attempt failed:", error); // Log retries
        if (i === 3) throw error;
        await new Promise(resolve => setTimeout(resolve, delays[i]));
      }
    }
    return "Connection failed.";
  }
}