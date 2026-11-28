import { describe, expect, it } from 'vitest';
import { validateLead } from './lead.mts';

const valid = {
  firstName: ' Jane ', lastName: 'Doe', email: 'jane@example.com',
  phone: '(470) 555-0100', interest: 'selling', message: 'Hello'
};

describe('validateLead', () => {
  it('accepts a valid lead and trims it', () => {
    expect(validateLead(valid)).toEqual({ lead: { ...valid, firstName: 'Jane' } });
  });

  it('flags a filled-in spam trap', () => {
    expect(validateLead({ ...valid, website: 'http://spam.example' })).toEqual({ spam: true });
  });

  it('drops unknown fields', () => {
    const result = validateLead({ ...valid, website: '', isAdmin: true });
    expect(result).toEqual({ lead: { ...valid, firstName: 'Jane' } });
  });

  it('rejects bad or missing fields', () => {
    expect(validateLead(null)).toHaveProperty('error');
    expect(validateLead({ ...valid, email: 'not-an-email' })).toHaveProperty('error');
    expect(validateLead({ ...valid, phone: '12345' })).toHaveProperty('error');
    expect(validateLead({ ...valid, interest: 'hacking' })).toHaveProperty('error');
    expect(validateLead({ ...valid, message: 'x'.repeat(5001) })).toHaveProperty('error');
    expect(validateLead({ ...valid, lastName: '' })).toHaveProperty('error');
  });
});
