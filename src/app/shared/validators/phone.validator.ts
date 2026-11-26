import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LEAD_LIMITS } from '../../core/utils/lead';

/**
 * Accepts US/international phone numbers written with digits, spaces, dashes,
 * dots, parentheses or a leading +, as long as there are 10-15 digits.
 * Empty values pass; combine with Validators.required where the field is mandatory.
 */
export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();
  if (!value) return null;
  if (value.length > LEAD_LIMITS.phone || !/^[-+().\s0-9]+$/.test(value)) return { phone: true };
  const digits = value.replace(/\D/g, '').length;
  return digits >= 10 && digits <= 15 ? null : { phone: true };
}
