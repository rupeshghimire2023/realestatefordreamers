import { ContactIntentService, toLeadInterest } from './contact-intent.service';

describe('ContactIntentService', () => {
  it('holds a request until it is cleared', () => {
    const service = new ContactIntentService();
    expect(service.pending()).toBeNull();
    service.request({ interest: 'selling', message: 'Hi' });
    expect(service.pending()).toEqual({ interest: 'selling', message: 'Hi' });
    service.clear();
    expect(service.pending()).toBeNull();
  });

  it('maps untrusted values to a valid interest', () => {
    expect(toLeadInterest('buying')).toBe('buying');
    expect(toLeadInterest('selling')).toBe('selling');
    expect(toLeadInterest('<script>')).toBe('other');
    expect(toLeadInterest(null)).toBe('other');
  });
});
