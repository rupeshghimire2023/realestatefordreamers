import { describe, expect, it } from 'vitest';
import { isSameOrigin, readJson } from './http.mts';

const post = (headers: Record<string, string>, body = '{}') =>
  new Request('https://realestatefordreamers.com/api/chat', { method: 'POST', headers, body });

describe('isSameOrigin', () => {
  it('allows requests from the same site', () => {
    expect(isSameOrigin(post({ origin: 'https://realestatefordreamers.com' }))).toBe(true);
    expect(isSameOrigin(post({ 'sec-fetch-site': 'same-origin' }))).toBe(true);
  });

  it('rejects other sites and requests with no browser headers', () => {
    expect(isSameOrigin(post({ origin: 'https://evil.example' }))).toBe(false);
    expect(isSameOrigin(post({ origin: 'null' }))).toBe(false);
    expect(isSameOrigin(post({}))).toBe(false);
  });
});

describe('readJson', () => {
  it('parses JSON and rejects oversized or malformed bodies', async () => {
    expect(await readJson(post({}, '{"a":1}'), 100)).toEqual({ a: 1 });
    expect(await readJson(post({}, 'x'.repeat(101)), 100)).toBeUndefined();
    expect(await readJson(post({}, '{nope'), 100)).toBeUndefined();
  });
});
