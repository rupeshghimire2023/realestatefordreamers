import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidPhone } from '../../core/utils/lead';

/**
 * Accepts US/international phone numbers with 10-15 digits (see isValidPhone).
 * Empty values pass; combine with Validators.required where the field is mandatory.
 */
export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value.trim()) return null;
  return isValidPhone(value) ? null : { phone: true };
}
