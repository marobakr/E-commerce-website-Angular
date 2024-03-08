import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrls: ['./addresse.component.css'],
})
export class AddresseComponent {
  constructor(private _formBuilder: FormBuilder) {}

  isLoding: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;
  addAddresseForm: FormGroup = this._formBuilder.group({
    addresse: ['', Validators.required],
  });

  get addresse(): AbstractControl<any, any> | null {
    return this.addAddresseForm.get('addresse');
  }

  addAddresse() {}
  removedisable() {}
}
