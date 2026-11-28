/** JSON response that is never cached. */
export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

/**
 * True when the request was sent by a page on this same site. Browsers always
 * send Origin (or at least Sec-Fetch-Site) on POST requests, so this stops other
 * websites from using our endpoints from their visitors' browsers. Scripts can
 * fake these headers; the per-IP rate limit is what stops those.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return req.headers.get('sec-fetch-site') === 'same-origin';
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

/** Parses a JSON body, or returns undefined if it's too large or malformed. */
export async function readJson(req: Request, maxChars: number): Promise<unknown> {
  const text = await req.text();
  if (text.length > maxChars) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
