import type { Config } from '@netlify/functions';
import { validateLead } from '../lib/lead.mts';
import { isSameOrigin, json, readJson } from '../lib/http.mts';

/*
 * Receives leads from the site's forms and forwards them to the Google Apps
 * Script (Sheet + email automation). The script URL stays on the server
 * (GOOGLE_SCRIPT_URL, marked as a secret in Netlify), so the only public way to
 * reach it is through this validated, rate-limited endpoint.
 * The browser also saves each lead to Firestore separately (see LeadService).
 */
const TIMEOUT_MS = 9000;

export const config: Config = {
  path: '/api/lead',
  method: 'POST',
  // Per visitor IP. A real visitor sends one or two; this stops form spam.
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};

export default async (req: Request) => {
  if (!isSameOrigin(req)) return json({ error: 'Forbidden' }, 403);

  const result = validateLead(await readJson(req, 10_000));
  if ('spam' in result) return json({ ok: true }); // don't tell bots they were caught
  if ('error' in result) return json({ error: result.error }, 400);

  const scriptUrl = Netlify.env.get('GOOGLE_SCRIPT_URL');
  if (!scriptUrl) {
    console.error('GOOGLE_SCRIPT_URL is not set');
    return json({ error: 'Lead delivery is not configured' }, 500);
  }

  try {
    // Same text/plain JSON body the script has always received from the browser.
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(result.lead),
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    if (!res.ok) {
      console.error(`Apps Script returned ${res.status}`);
      return json({ error: 'Lead delivery failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Apps Script request failed:', err);
    return json({ error: 'Lead delivery failed' }, 502);
  }
};
