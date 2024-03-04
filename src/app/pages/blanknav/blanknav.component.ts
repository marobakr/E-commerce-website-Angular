import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';

@Component({
  selector: 'app-blanknav',
  templateUrl: './blanknav.component.html',
  styleUrls: ['./blanknav.component.css'],
})
export class BlanknavComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _renderer2: Renderer2,
    private _productsDataService: ProductsDataService
  ) {}

  @ViewChild('categoriesLinks') categorLinks!: ElementRef;
  @ViewChild('cartIcon') cartIcon!: ElementRef;
  itemCount: number = 0;
  urlImage: any = '';
  userName: any = '';
  ulCategories: Categoreis[] = [];
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
    if (localStorage.getItem('imageUser') !== null) {
      this.urlImage = localStorage.getItem('imageUser');
    }
    if (localStorage.getItem('imageUser') !== null) {
      this.userName = localStorage.getItem('username');
    }
  }

  listenerCartItem(): void {
    this._cartService.cartNumber.subscribe({
      next: (response) => {
        this.itemCount = response;
        if (this.itemCount > 0) {
          this.getItemCart();
        }
      },
    });
  }

  getItemCart(): void {
    this._cartService.getCartUser().subscribe({
      next: (respons) => {
        this._renderer2.addClass(this.cartIcon.nativeElement, 'alarmTrue');
        this.itemCount = respons.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
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
  uploadImgeUser(event: any) {
    if (event.target?.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.urlImage = event.target?.result;
        localStorage.setItem('imageUser', this.urlImage);
        window.location.reload();
      };
    }
  }

  getCategoriesUl() {
    const categoryLinks = this.categorLinks.nativeElement;
    const hasClass = categoryLinks.classList.contains('d-none');
    if (hasClass) {
      this._productsDataService.allCategories().subscribe({
        next: (response) => {
          this.ulCategories = response.data;
          this._renderer2.removeClass(
            this.categorLinks.nativeElement,
            'd-none'
          );
        },
      });
    } else {
      this._renderer2.addClass(this.categorLinks.nativeElement, 'd-none');
    }
  }
  // to display Ul Links
  subCategorie(id: string) {
    this._productsDataService.specificCategories(id).subscribe({
      next: (response) => {},
    });
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this._renderer2.addClass(this.categorLinks.nativeElement, 'd-none');
  }
}
