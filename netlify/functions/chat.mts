import type { Config } from '@netlify/functions';
import { ChatTurn, MAX_TEXT, SYSTEM_PROMPT, buildMessages, extractReply, faqReply } from '../lib/chat.mts';
import { isSameOrigin, json, readJson } from '../lib/http.mts';

/*
 * Website chat assistant. Works with any OpenAI-compatible chat API; the default
 * is Groq's free tier. Netlify environment variables:
 *   CHAT_API_KEY           required for AI answers (mark it as a secret in Netlify)
 *   CHAT_API_URL           optional, defaults to Groq
 *   CHAT_MODEL             optional, defaults to openai/gpt-oss-20b
 *   CHAT_REASONING_EFFORT  optional; "low" by default for gpt-oss models, "" to omit
 * Without a key, or when the provider fails or its free quota runs out, the
 * assistant answers from a short FAQ instead, so the chat never goes dead.
 */
const DEFAULT_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-20b';
const TIMEOUT_MS = 8000;

export const config: Config = {
  path: '/api/chat',
  method: 'POST',
  // Per visitor IP. Keeps one person (or bot) from using up the free AI quota.
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};

export default async (req: Request) => {
  if (!isSameOrigin(req)) return json({ error: 'Forbidden' }, 403);

  const body = (await readJson(req, 20_000)) as { text?: unknown; history?: unknown } | undefined;
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, MAX_TEXT) : '';
  if (!text) return json({ reply: "Please type a question and I'll do my best to help!" }, 400);

  const reply = await askModel(buildMessages(body?.history, text));
  return json(reply ? { reply } : { reply: faqReply(text), fallback: true });
};

async function askModel(messages: ChatTurn[]): Promise<string | null> {
  const apiKey = Netlify.env.get('CHAT_API_KEY');
  if (!apiKey) return null;

  const model = Netlify.env.get('CHAT_MODEL') || DEFAULT_MODEL;
  const effort = Netlify.env.get('CHAT_REASONING_EFFORT') ?? (model.includes('gpt-oss') ? 'low' : '');
  const payload: Record<string, unknown> = {
    model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 600, // includes the model's reasoning tokens
    temperature: 0.4
  };
  if (effort) payload['reasoning_effort'] = effort;

  try {
    const res = await fetch(Netlify.env.get('CHAT_API_URL') || DEFAULT_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    if (!res.ok) {
      // 429 = free quota or per-minute limit reached; 400/404 = check CHAT_MODEL.
      console.error(`Chat provider returned ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return null;
    }
    return extractReply(await res.json());
  } catch (err) {
    console.error('Chat provider request failed:', err);
    return null;
  }
}
