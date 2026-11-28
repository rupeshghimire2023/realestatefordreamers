import { LEAD_INTERESTS, LEAD_LIMITS, isValidPhone } from '../../src/app/core/utils/lead';

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: (typeof LEAD_INTERESTS)[number];
  message: string;
}

export type LeadCheck = { lead: Lead } | { spam: true } | { error: string };

// Same pattern as the leads rule in firestore.rules.
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Validates a lead posted by the site's forms, using the same limits as the
 * forms and firestore.rules. `website` is a hidden spam-trap field: people never
 * see it, so a value there means a bot filled in the form.
 */
export function validateLead(body: unknown): LeadCheck {
  if (!body || typeof body !== 'object') return { error: 'Invalid request' };
  const b = body as Record<string, unknown>;

  if (typeof b['website'] === 'string' && b['website'].trim()) return { spam: true };

  const text = (key: string, max: number): string | null => {
    const value = b[key];
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed && trimmed.length <= max ? trimmed : null;
  };

  const firstName = text('firstName', LEAD_LIMITS.name);
  const lastName = text('lastName', LEAD_LIMITS.name);
  const email = text('email', LEAD_LIMITS.email);
  const phone = text('phone', LEAD_LIMITS.phone);
  const message = text('message', LEAD_LIMITS.message);
  const interest = LEAD_INTERESTS.find(i => i === b['interest']);

  if (!firstName || !lastName) return { error: 'Name is required' };
  if (!email || !EMAIL.test(email)) return { error: 'A valid email is required' };
  if (!phone || !isValidPhone(phone)) return { error: 'A valid phone number is required' };
  if (!message) return { error: 'A message is required' };
  if (!interest) return { error: 'Invalid interest' };

  return { lead: { firstName, lastName, email, phone, interest, message } };
}
