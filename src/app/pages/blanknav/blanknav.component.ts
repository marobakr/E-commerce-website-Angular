import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-blanknav',
  templateUrl: './blanknav.component.html',
  styleUrls: ['./blanknav.component.css'],
})
export class BlanknavComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _renderer2: Renderer2
  ) {}
  @ViewChild('cartIcon') cartIcon!: ElementRef;
  itemCount: number = 0;
  allLInks: string[] = ['home', 'products', 'categories', 'brands'];
  allIcons: string[] = [
    'fa-brands fa-facebook',
    'fa-brands fa-instagram',
    'fa-brands fa-twitter',
    'fa-brands fa-linkedin',
    'fa-brands fa-tiktok',
    'fa-brands fa-youtube',
  ];
  ngOnInit(): void {
    this.listenerCartItem();
  }

  listenerCartItem(): void {
    this._cartService.cartNumber.subscribe({
      next: (response) => {
        this.itemCount = response;
        this.getItemCart();
      },
    });
  }

  getItemCart(): void {
    this._cartService.getCartUser().subscribe({
      next: (respons) => {
        this.itemCount = respons.numOfCartItems;
        this._renderer2.addClass(this.cartIcon.nativeElement, 'alarmTrue');
      },
      error: () => {},
      complete: () => {
        setTimeout(() => {
          this._renderer2.removeClass(this.cartIcon.nativeElement, 'alarmTrue');
        }, 3000);
      },
    });
  }

  sinOut(): void {
    this._authService.sinOut();
  }
}
