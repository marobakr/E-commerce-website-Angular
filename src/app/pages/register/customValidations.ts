import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * custom validation to FormGroupe with paremter
 * this function accepte tow controls
 * and do check if the value of control password matches with control rePassword
 *
 * @function confirmPassword
 * @param {control} controlName1
 * @param {control} controlName2
 * @returns {ValidatorFn}

 * @arrowFunction
 * @param {formGroup}
 * @returns {null | {[key: string]: boolean } }
 */
export function confirmPassword(controlName1: string, controlName2: string) {
  return (FormGroup: FormGroup): null | { [key: string]: boolean } => {
    const password = FormGroup.get(controlName1)?.value;
    const rePassword = FormGroup.get(controlName2)?.value;
    if (rePassword !== password) {
      FormGroup.get(controlName2)?.setErrors({ noMatch: true });
    }
    return null;
  };
}

/**
 * custom validation to control with paremter
 * this function accepte control
 * and do check if the value of control matches with RgEx
 *
 * @function validNumber
 * @param control
 * @returns {null | {}}
 */
export function validNumber(
  control: AbstractControl
): null | { [key: string]: boolean } {
  if (control.value.match(/[a-zA-Z]/g)) {
    return { havestring: true };
  }
  return null;
}

/**
 * custom validation to control with paremter
 * this function accepte the minLength as paremter
 * and do check if the value of control matches with paremter length
 *
 * @function minLength
 * @param minLength
 * @returns {ValidatorFn}
 *
 * @arrowFunction
 * @param control
 * @returns {null  || {} }
 */

export function minLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): null | { [key: string]: boolean } => {
    if (control.value.length >= minLength) {
      return null;
    }
    return { minlength: true };
  };
}
