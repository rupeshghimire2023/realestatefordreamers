import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  // Relative path to the Netlify function (works automatically when deployed).
  private apiUrl = '/.netlify/functions/chat';

  // Only the most recent turns are sent, to keep requests small.
  private readonly maxHistory = 10;

  async sendMessage(userText: string, history: ChatMessage[] = []): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userText,
          history: history.slice(-this.maxHistory).map(m => ({
            role: m.isUser ? 'user' : 'model',
            text: m.text
          }))
        })
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
