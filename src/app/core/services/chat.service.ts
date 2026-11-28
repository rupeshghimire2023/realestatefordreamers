import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/models';

const TIMEOUT_MS = 15_000;

/** Talks to the /api/chat Netlify function (netlify/functions/chat.mts). */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = '/api/chat';

  // Only the most recent messages are sent, to stay within the free AI quota.
  private readonly maxHistory = 6;

  async sendMessage(userText: string, history: ChatMessage[] = []): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userText,
          history: history.slice(-this.maxHistory).map(m => ({
            role: m.isUser ? 'user' : 'assistant',
            text: m.text
          }))
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS)
      });

      if (response.status === 429) {
        return "You're sending messages a little fast. Please wait a minute and try again.";
      }
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();
      return typeof result.reply === 'string' && result.reply
        ? result.reply
        : "I'm having trouble connecting right now.";
    } catch (error) {
      console.error('Chatbot Error:', error);
      return "I'm currently offline or having connection issues. Please try again later, or use the contact form.";
    }
  }
}
