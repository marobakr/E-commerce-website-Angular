import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/core/auth.service';
import { streatch } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [streatch],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private notifierService: NotifierService,
    private _router: Router
  ) {}
  private subscription!: Subscription;
  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  isLoding: boolean = false;

  ngOnInit(): void {
    this.initFormControl();
    this.initFormGroup();
  }

  initFormGroup() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  initFormControl() {
    this.email = new FormControl(localStorage.getItem('email'), [
      Validators.required,
      Validators.email,
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]);
  }

  signIn(loginForm: FormGroup) {
    if (loginForm.valid && !this.isLoding) {
      this.isLoding = true;
      this._authService.signIn(loginForm.value).subscribe({
        next: (respons) => {
          if (respons.user.name === 'admin') {
            this._router.navigate(['/dashboard']);
            this.notifierService.notify(
              'warning',
              `${respons.message} Log In as admin ☠️ `
            );
          } else {
            setTimeout(() => {
              this._router.navigate(['/home']);
            }, 100);
            this.notifierService.notify(
              'success',
              `${respons.message} Log In as user 👨‍💼`
            );
          }
          this.isLoding = false;
          if (respons.message === 'success') {
            localStorage.setItem('token', respons.token);
            localStorage.setItem('username', respons.user.name);
            loginForm.reset();
          }
        },
        error: (er) => {
          this.isLoding = false;
          this.notifierService.notify('error', `${er.error.message} ❌`);
        },
      });
    } else {
      loginForm.markAllAsTouched();
    }
  }
}
