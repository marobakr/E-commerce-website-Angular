import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ForgetpasswordService } from 'src/app/core/forgetpassword.service';
import { UserSettingsService } from 'src/app/core/user-settings.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _notifierService: NotifierService,
    private _userSettingsService: UserSettingsService
  ) {}
  isLoding: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;

  ngOnInit() {}

  confirmPassword = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    if (rePassword !== password) {
      control.get('rePassword')?.setErrors({ noMatch: true });
    }
  };
  updateFormPassword: FormGroup = this._formBuilder.group(
    {
      currentPassword: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],
      rePassword: ['', [Validators.required]],
    },
    {
      validators: [this.confirmPassword],
    }
  );

  changePassword(form: FormGroup) {
    if (form.valid && !this.isLoding) {
      this.isLoding = true;
      this._userSettingsService.updatePassword(form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoding = false;
          this._notifierService.notify('success', `${response.message}data`);
          localStorage.removeItem('token');
          localStorage.setItem('token', response.token);
          // To Inable The Btn
          this.removedisable();
        },
        error: (err) => {
          console.log(err);
          this.isLoding = false;
          this._notifierService.notify('error', err.error.msg);
        },
      });
    } else {
      this.isLoding = false;
      form.markAllAsTouched();
    }
  }
  // remove property disabled and readonly from all input to update
  removedisable(): void {
    this.disabled = !this.disabled;
    this.readonly = !this.readonly;
  }

  get currPassowrd(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('currentPassword');
  }
  get newPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('password');
  }
  get reNewPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('rePassword');
  }
}
