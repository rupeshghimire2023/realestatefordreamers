import { FormControl } from '@angular/forms';
import { phoneValidator } from './phone.validator';

const check = (value: string) => phoneValidator(new FormControl(value));

describe('phoneValidator', () => {
  it('accepts common formats with 10-15 digits', () => {
    for (const ok of ['(470) 652-6362', '470-652-6362', '470.652.6362', '+1 470 652 6362', '4706526362']) {
      expect(check(ok)).toBeNull();
    }
  });

  it('rejects too few digits even when the text is long enough', () => {
    expect(check('(555) 123-4')).toEqual({ phone: true });
  });

  it('rejects letters and overly long input', () => {
    expect(check('call me maybe')).toEqual({ phone: true });
    expect(check('1'.repeat(16))).toEqual({ phone: true });
  });

  it('leaves empty values to Validators.required', () => {
    expect(check('')).toBeNull();
  });
});
