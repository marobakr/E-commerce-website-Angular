import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserSettingsService } from 'src/app/core/user-settings.service';

@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrls: ['./addresse.component.css'],
})
export class AddresseComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _userSettingsService: UserSettingsService,
    private _notifierService: NotifierService
  ) {}

  isLoding: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;
  addAddresseForm: FormGroup = this._formBuilder.group({
    name: [
      ,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    details: [''],
    city: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
  });

  ngOnInit(): void {
    this.getdefaultData();
  }
  getdefaultData() {
    this._userSettingsService.defualtUserData().subscribe({
      next: (response: any) => {
        console.log(response);
        const length: number = response.data?.addresses.length;
        const baseNested: any = response.data?.addresses[length - 1];
        const defaultCity = baseNested?.city;
        const defaultDetails = baseNested?.details;
        const defaultHome = response.data?.name;
        this.city?.setValue(defaultCity);
        this.house?.setValue(defaultHome);
        this.details?.setValue(defaultDetails);
      },
    });
  }

  addAddresse(form: FormGroup) {
    console.log(form.value);
    if (form.valid && !this.isLoding) {
      this.isLoding = true;
      this._userSettingsService.addAdsress(form.value).subscribe({
        next: (response) => {
          this.isLoding = false;
          this._notifierService.notify('success', `${response.message}data`);
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

  removedisable() {
    this.disabled = !this.disabled;
    this.readonly = !this.readonly;
  }

  get city(): AbstractControl<any, any> | null {
    return this.addAddresseForm.get('city');
  }
  get house(): AbstractControl<any, any> | null {
    return this.addAddresseForm.get('name');
  }
  get details(): AbstractControl<any, any> | null {
    return this.addAddresseForm.get('details');
  }
}
