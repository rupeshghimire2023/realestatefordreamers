import { toDate } from './firestore-date';

describe('toDate', () => {
  it('converts Firestore Timestamps and {seconds} objects', () => {
    const date = new Date('2026-03-01T12:00:00Z');
    expect(toDate({ toDate: () => date })).toBe(date);
    expect(toDate({ seconds: date.getTime() / 1000, nanoseconds: 0 })?.getTime()).toBe(date.getTime());
  });

  it('parses ISO strings and epoch millis', () => {
    expect(toDate('2026-03-01')?.getUTCFullYear()).toBe(2026);
    expect(toDate(0)?.getTime()).toBe(0);
  });

  it('returns undefined for missing or invalid values', () => {
    expect(toDate(undefined)).toBeUndefined();
    expect(toDate(null)).toBeUndefined();
    expect(toDate('')).toBeUndefined();
    expect(toDate('not a date')).toBeUndefined();
    expect(toDate({ foo: 1 })).toBeUndefined();
  });
});
