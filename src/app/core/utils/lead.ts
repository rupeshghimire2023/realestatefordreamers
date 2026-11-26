/**
 * Field limits for leads. They mirror the `leads` rule in firestore.rules, so a
 * form that passes validation is never rejected by Firestore. Keep them in sync.
 */
export const LEAD_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  address: 300,
  message: 5000
} as const;

/** "4 Beds, 3 Baths, 2,500 SqFt" - leaves out anything the visitor didn't fill in. */
export function describeHome(home: { beds?: number | null; baths?: number | null; sqft?: number | null }): string {
  const parts: string[] = [];
  if (home.beds != null) parts.push(`${home.beds} Beds`);
  if (home.baths != null) parts.push(`${home.baths} Baths`);
  if (home.sqft != null) parts.push(`${home.sqft.toLocaleString('en-US')} SqFt`);
  return parts.length ? parts.join(', ') : 'Not provided';
}
