import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForgetpasswordService } from './../../core/forgetpassword.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { toggleFade } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  animations: [toggleFade],
})
export class ForgetPasswordComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _fBS: ForgetpasswordService,
    private _NotifierService: NotifierService,
    private _router: Router
  ) {}
  private subscription!: Subscription;
  firstStep: boolean = true;
  nextStep: boolean = false;
  lastStep: boolean = false;
  isLoding: boolean = false;

  // forgetPassword
  formPassword: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email(): AbstractControl<any, any> | null {
    return this.formPassword.get('email');
  }
  // submitCode
  codeForm: FormGroup = this._formBuilder.group({
    code: this._formBuilder.group({
      digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    }),
  });

  // updatePassword
  resetForm: FormGroup = this._formBuilder.group({
    email: [localStorage.getItem('email')],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });
  get emailUpdate(): AbstractControl<any, any> | null {
    return this.resetForm.get('email');
  }
  get newPassword(): AbstractControl<any, any> | null {
    return this.resetForm.get('newPassword');
  }
  // forgetPassword
  missPassword() {
    if (this.formPassword.valid) {
      this.isLoding = true;
      this._fBS.forgetPassword(this.email?.value).subscribe({
        next: (response) => {
          this.isLoding = false;
          localStorage.setItem('email', this.email?.value);
          this.formPassword.reset();
          this._NotifierService.notify('success', response.message);
          this.firstStep = false;
          this.nextStep = true;
        },
        error: (err) => {
          this.isLoding = false;
          this._NotifierService.notify('error', 'this email not register');
        },
      });
    } else {
      this.formPassword.markAllAsTouched();
    }
  }

  // submitCode
  submitCode() {
    if (this.codeForm.valid) {
      this.isLoding = true;
      let validCode: string = '';
      const objectForm = this.codeForm.value.code;
      for (const key in objectForm) {
        validCode += objectForm[key];
      }
      this._fBS.verifyCode(validCode).subscribe({
        next: () => {
          this.codeForm.reset();
          this.isLoding = false;
          this.nextStep = false;
          this.lastStep = true;
        },
        error: (err) => {
          this.isLoding = false;
          this._NotifierService.notify('error', err.error.message);
        },
      });
    }
  }
  // updatePassword
  updatePassword(userData: FormGroup) {
    if (userData.valid) {
      this._fBS.resetPassword(userData.value).subscribe({
        next: (respons) => {
          if (respons.token) {
            userData.reset();
            this._NotifierService.notify('seccess', 'seccess update password ');
            localStorage.setItem('token', respons.token);
            this._router.navigate(['/home']);
          }
        },
        error: (err) => {
          this._NotifierService.notify('error', err.error.message);
        },
      });
    } else {
      userData.markAllAsTouched();
    }
  }
}
