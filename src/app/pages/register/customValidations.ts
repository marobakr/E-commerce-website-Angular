import { AbstractControl } from '@angular/forms';

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
