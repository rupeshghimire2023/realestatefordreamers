/**
 * Field limits for leads. They mirror the `leads` rule in firestore.rules, so a
 * form that passes validation is never rejected by Firestore. Keep them in sync.
 * Also used by the /api/lead Netlify function (netlify/lib/lead.mts).
 */
export const LEAD_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  address: 300,
  message: 5000
} as const;

export const LEAD_INTERESTS = ['buying', 'selling', 'other'] as const;

/**
 * US/international phone number written with digits, spaces, dashes, dots,
 * parentheses or a leading +, with 10-15 digits in total.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length > LEAD_LIMITS.phone || !/^[-+().\s0-9]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '').length;
  return digits >= 10 && digits <= 15;
}

/** "4 Beds, 3 Baths, 2,500 SqFt" - leaves out anything the visitor didn't fill in. */
export function describeHome(home: { beds?: number | null; baths?: number | null; sqft?: number | null }): string {
  const parts: string[] = [];
  if (home.beds != null) parts.push(`${home.beds} Beds`);
  if (home.baths != null) parts.push(`${home.baths} Baths`);
  if (home.sqft != null) parts.push(`${home.sqft.toLocaleString('en-US')} SqFt`);
  return parts.length ? parts.join(', ') : 'Not provided';
}
