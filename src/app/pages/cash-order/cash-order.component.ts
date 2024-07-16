import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-cash-order',
  templateUrl: './cash-order.component.html',
  styleUrls: ['./cash-order.component.css'],
})
export class CashOrderComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _router: Router,
    private _wishlistService: WishlistService
  ) {}

  cachOrderForm!: FormGroup;
  phone!: FormControl;
  city!: FormControl;
  details!: FormControl;
  _idCart: string = '';
  isLoding: boolean = false;
  userId: string = '';

  ngOnInit(): void {
    this.initFormControl();
    this.initFormGroup();
    this.getParamsCart();
  }

  initFormGroup(): void {
    this.cachOrderForm = new FormGroup({
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

  CheckoutOnDelivery(userInfo: any) {
    // this.onButtonClick();
    if (this.cachOrderForm.valid) {
      this.isLoding = true;
      this._cartService.cashOrder(userInfo.value, this._idCart).subscribe({
        next: (respons) => {
          this._cartService.cartNumber.next(0);
          this._router.navigate(['/allorders']);
          this.isLoding = false;
        },
        error: (err) => {
          this.isLoding = false;
        },
      });
    } else {
      this.cachOrderForm.markAllAsTouched();
    }
  }
}
