import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPassword(control: AbstractControl) {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;
  if (rePassword !== password) {
    control.get('rePassword')?.setErrors({ noMatch: true });
  }
}

export function validNumber(control: AbstractControl) {
  if (control.value.match(/[a-zA-Z]/g)) {
    return { havestring: true };
  }
  return null;
}

/**
 * custom validation with paremter
 * this function accepte the minLength as paremter
 * and do check if the value of control matches with paremter length
 *
 * @function minLength
 * @param minLength
 * @returns {ValidatorFn}
 *
 * @arrow
 * @param control
 * @returns {null  || {} }

 */

export function minLength(minLength: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value.length >= minLength) {
      return null;
    }
    return { minlength: true };
  };
}
