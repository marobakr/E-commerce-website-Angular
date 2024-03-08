import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent {
  constructor(private _formBuilder: FormBuilder) {}
  isLoding: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;
  confirmPassword = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    if (rePassword !== password) {
      control.get('rePassword')?.setErrors({ noMatch: true });
    }
  };

  updateFormPassword: FormGroup = this._formBuilder.group(
    {
      current: ['', [Validators.required]],
      password: [
        '',
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ],
      rePassword: ['', Validators.required],
    },
    {
      validators: [this.confirmPassword],
    }
  );

  get currPassowrd(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('current');
  }
  get newPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('password');
  }
  get reNewPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('rePassword');
  }

  // remove property disabled and readonly from all input to update
  removedisable(): void {
    this.disabled = !this.disabled;
    this.readonly = !this.readonly;
  }

  updateData(form: FormGroup) {}
}
