import { UserSettingsService } from 'src/app/core/user-settings.service';
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
import { WishlistService } from 'src/app/core/wishlist.service';
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
    private _productsDataService: ProductsDataService,
    private _wishlistService: WishlistService,
    private _userSettingsService: UserSettingsService
  ) {}
  @ViewChild('settings') settings!: ElementRef;

  @ViewChild('categoriesLinks') categorLinks!: ElementRef;

  itemCount: number = 0;
  orderCount: number = 0;
  isClick: boolean = false;
  wishListCount: number = 0;
  urlImage: any = '';
  avatar: any = 'https://www.w3schools.com/howto/img_avatar.png';
  userName: any = '';
  userId: string = '';
  isScroll: boolean = false;

  ulCategories: Categoreis[] = [];
  allIcons: string[] = [
    'fa-brands fa-facebook fa-xl',
    'fa-brands fa-instagram fa-xl',
    'fa-brands fa-twitter fa-xl',
    'fa-brands fa-linkedin fa-xl',
    'fa-brands fa-tiktok fa-xl',
    'fa-brands fa-youtube fa-xl',
  ];
  ngOnInit(): void {
    this.listenerCartItem();
    this.getItemCart();
    this.listenerWishList();
    this.getWishlist();
    this.listenOrderItem();
    this.getOrderNumber();
    this.subscriptionUserImage();
    this.subscriptionUserName();
  }
  //*  subScription to BehaviorSubject
  listenerCartItem(): void {
    this._cartService.cartNumber.subscribe({
      next: (response) => {
        this.itemCount = response;
      },
    });
  }

  subscriptionUserImage(): void {
    this._userSettingsService.userImagePath.subscribe({
      next: (response) => {
        this.urlImage = response;
      },
    });
    if (localStorage.getItem('imageUser') !== null) {
      this.urlImage = localStorage.getItem('imageUser');
    }
  }
  subscriptionUserName(): void {
    this._userSettingsService.userName.subscribe({
      next: (username) => {
        this.userName = username;
      },
    });
    if (localStorage.getItem('username') !== null) {
      this.userName = localStorage.getItem('username');
    }
  }
  listenOrderItem(): void {
    this._cartService.orderNumber.subscribe({
      next: (response) => {
        this.orderCount = response;
      },
    });
  }
  listenerWishList(): void {
    this._wishlistService.wishListNumber.subscribe({
      next: (response) => {
        this.wishListCount = response;
      },
    });
  }
  getItemCart(): void {
    this._cartService.getCartUser().subscribe({
      next: (respons) => {
        this.itemCount = respons.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishlist(): void {
    this._wishlistService.getWishlistItem().subscribe({
      next: (response) => {
        this._wishlistService.wishListNumber.next(response.count);
      },
    });
  }
  getOrderNumber() {
    const userData = this._cartService.decodeUserData();
    this.userId = userData.id;
    this._cartService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this._cartService.orderNumber.next(response.length);
      },
    });
  }
  uploadImgeUser(event: any) {
    if (event.target?.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.urlImage = event.target?.result;
        localStorage.setItem('imageUser', this.urlImage);
        this._userSettingsService.userImagePath.next(this.urlImage);
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
  // Just to display Ul Links
  subCategorie(id: string) {
    this._productsDataService.specificCategories(id).subscribe({
      next: (response) => {},
    });
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this._renderer2.addClass(this.categorLinks.nativeElement, 'd-none');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 150) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  toggleShow() {
    this.isClick = !this.isClick;
  }

  sinOut(): void {
    this._authService.sinOut();
  }
}
