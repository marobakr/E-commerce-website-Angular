import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserSettingsService } from 'src/app/core/user-settings.service';
import { toggleFade } from '../../../../shared/animations/toggle-fade';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [toggleFade],
})
export class AccountComponent implements OnInit {
  constructor(
    private _userSettingsService: UserSettingsService,
    private _notifierService: NotifierService,
    private _formBuilder: FormBuilder
  ) {}
  defaultName: any = '';
  defaultEmail: string = '';
  defaultPhone: string = '';
  isLoding: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;
  allDefualtUserData: any = {};
  updateFormData!: FormGroup;

  ngOnInit() {
    // here i should wright this line in subscriptionUserName() but it wasn't work so i will learn more about rxjs to reslove this bug
    this.defaultName = localStorage.getItem('username');
    this.getdefaultData();
    this.subscriptionUserName();
    this.updateFormData = this._formBuilder.group({
      name: [
        this.defaultName,
        [Validators.minLength(3), Validators.maxLength(20)],
      ],
      email: [, Validators.email],
      phone: [, [Validators.pattern(/^01[0125][0-9]{8}$/)]],
    });
  }

  subscriptionUserName() {
    this._userSettingsService.userName.subscribe({
      next: (username) => {
        this.defaultName = username;
        console.log(this.defaultName);
      },
    });
  }

  updateData(form: FormGroup) {
    console.log(form.value);
    if (form.valid && !this.isLoding) {
      this.isLoding = true;
      this._userSettingsService.updateUserData(form.value).subscribe({
        next: (response) => {
          this.isLoding = false;
          this._notifierService.notify('success', `${response.message}data`);
          this._userSettingsService.userName.next(response.user.name);
          localStorage.setItem('username', response.user.name);
          // To Inable The Btn
          this.removedisable();
          // Re Assinged the Defualt Data For User
          this.getdefaultData();
        },
        error: (err) => {
          console.log(err);
          this.isLoding = false;
          this._notifierService.notify('error', err.error.errors.msg);
        },
      });
    } else {
      this.isLoding = false;

      form.markAllAsTouched();
    }
  }
  getdefaultData() {
    this._userSettingsService.defualtUserData().subscribe({
      next: (response) => {
        this.defaultName = response.data.name;
        this.defaultEmail = response.data.email;
        this.defaultPhone = response.data.phone;
        this.name?.setValue(this.defaultName);
        this.email?.setValue(this.defaultEmail);
        this.phone?.setValue(this.defaultPhone);
      },
    });
  }
  // remove property disabled and readonly from all input to update
  removedisable(): void {
    const random: string = Math.floor(Math.random() * 1000).toString();
    const dumyData: object = {
      email: `marwantest${random}@gmail.com`,
    };
    this._userSettingsService.updateUserData(dumyData).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
    this.disabled = !this.disabled;
    this.readonly = !this.readonly;
  }

  get name(): AbstractControl<any, any> | null {
    return this.updateFormData.get('name');
  }
  get email(): AbstractControl<any, any> | null {
    return this.updateFormData.get('email');
  }
  get phone(): AbstractControl<any, any> | null {
    return this.updateFormData.get('phone');
  }
}
