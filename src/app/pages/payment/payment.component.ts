import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _cartService: CartService
  ) {}
  payMentForm!: FormGroup;
  phone!: FormControl;
  city!: FormControl;
  details!: FormControl;
  _idCart: string = '';
  isLoding: boolean = false;
  canDeActivate: boolean = false;
  ngOnInit(): void {
    this.initFormControl();
    this.initFormGroup();
    this.getParamsCart();
  }

  initFormGroup(): void {
    this.payMentForm = new FormGroup({
      phone: this.phone,
      city: this.city,
      details: this.details,
    });
  }
  initFormControl(): void {
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]);
    this.city = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.details = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
  }

  getParamsCart(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (respons: any) => {
        this._idCart = respons.params.idcart;
      },
    });
  }

  CheckoutOnLine(userInfo: any): void {
    if (this.payMentForm.valid) {
      this.isLoding = true;
      this._cartService.PaymentOnline(userInfo.value, this._idCart).subscribe({
        next: (respons) => {
          this._cartService.cartNumber.next(0);
          this.canDeActivate = true;
          window.open(respons.session.url);
          this.isLoding = false;
        },
        error: (err) => {
          this.isLoding = false;
        },
      });
    } else {
      this.payMentForm.markAllAsTouched();
    }
  }
}
