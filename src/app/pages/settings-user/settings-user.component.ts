import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.css'],
})
export class SettingsUserComponent implements OnInit {
  constructor(
    private _notifierService: NotifierService,
    private _cartService: CartService
  ) {}
  isLoding: boolean = false;
  name!: FormControl;
  phone!: FormControl;
  email!: FormControl;
  defultImage: any = '';
  updateFormData!: FormGroup;
  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
    this.initFormControl();
    this.initFormGroup();
    this.fillDefuletData();
  }

  initFormControl(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  initFormGroup(): void {
    this.updateFormData = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }

  updateData(form: FormGroup) {
    if (form.valid && !this.isLoding) {
      this.isLoding = true;
      // this._authService.signUp(registerForm.value).subscribe({
      //   next: (respons) => {
      //     this._notifierService.notify(
      //       'success',
      //       `${respons.message} register`
      //     );

      //     this.isLoding = false;
      //     form.reset();
      //   },
      //   error: (error: any) => {
      //     this.isLoding = false;
      //     this._notifierService.notify('error', `${error.error.message}`);
      //   },
      // });
    } else {
      form.markAllAsTouched();
    }
  }

  fillDefuletData(): void {
    if (localStorage.getItem('imageUser') !== null) {
      this.defultImage = localStorage.getItem('imageUser');
      const data = this._cartService.decodeUserData();
    }
  }

  selectImage() {
    this.fileInput.nativeElement.click();
  }
  uploadImage(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.defultImage = event.target?.result;
      localStorage.setItem('imageUser', this.defultImage);
      window.location.reload();
    };
  }
}
