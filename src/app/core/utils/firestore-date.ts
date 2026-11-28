/**
 * Converts a date stored in Firestore to a JS Date.
 *
 * Content is edited by hand in the Firebase console, so a "date" field may be a
 * Firestore Timestamp, a plain {seconds} object, an ISO string or epoch millis.
 * Returns undefined for missing or unparseable values so templates can skip them.
 */
export function toDate(value: unknown): Date | undefined {
  if (value === null || value === undefined || value === '') return undefined;

  if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;

  if (typeof value === 'object') {
    const v = value as { toDate?: () => Date; seconds?: number };
    if (typeof v.toDate === 'function') return v.toDate();
    if (typeof v.seconds === 'number') return new Date(v.seconds * 1000);
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  }

  return undefined;
}
