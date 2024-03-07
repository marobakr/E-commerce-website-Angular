import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { WishlistService } from 'src/app/core/wishlist.service';
import { Products } from 'src/app/interfaces/products';
import { BtncartComponent } from 'src/app/shared/btncart/btncart.component';

@Component({
  selector: 'app-base-products',
  templateUrl: './base-products.component.html',
  styleUrls: ['./base-products.component.css'],
})
export class BaseProductsComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _notifierService: NotifierService,
    private _ProductsDataService: ProductsDataService,
    private _wishlistService: WishlistService
  ) {}
  previousProductLength: number | undefined;
  wishListData: Products[] = [];
  @Output() emitterLength = new EventEmitter();
  @ViewChild('allItems') itemsLength!: any;
  @Input() allProducts: Products[] = [];
  @Input() selectedCategoryName: any = '';
  @Input() InWshListPadge: boolean = false;
  @Input() uniqeBrands: string[] = [''];
  @Input() inputSearch: string = '';
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() isLoding: boolean = false;
  @Input() selectedOption: any = 'all';
  @Input() sortBy: string = 'sort';
  @Input() ratingNumber: number = 5;
  @Input() isClassApplied: boolean = false;
  @Input() priceRange: number = 45000;
  @Input() productLength: number = 0;
  @Input() showWishList: boolean = false;
  @Input() col_4: boolean = false;
  @Input() col_3: boolean = false;

  ngOnInit(): void {
    this.dsiplayWishList();
  }

  dsiplayWishList() {
    this._wishlistService.getWishlistItem().subscribe({
      next: (response) => {
        const allWishlistItem = response.data.map((item: any) => item._id);
        this.wishListData = allWishlistItem;
      },
    });
  }
  addProduct(_id: string, btnComponent: BtncartComponent): void {
    btnComponent.isLoding = true;
    this._cartService.addToCart(_id).subscribe({
      next: (respons) => {
        this._cartService.cartNumber.next(respons.numOfCartItems);
        this._notifierService.notify('success', `${respons.message}`);
        btnComponent.isLoding = false;
      },
      error: (erorr) => {
        console.log(erorr);
      },
    });
  }
  ngAfterContentChecked(): void {
    setTimeout(() => {
      if (this.itemsLength) {
        const newProductLength =
          this.itemsLength.nativeElement.childElementCount;
        if (newProductLength !== this.previousProductLength) {
          this.productLength = newProductLength;
          this._ProductsDataService.lengthProducts.next(this.productLength);
          this.previousProductLength = newProductLength;
        }

        return;
      }
    }, 0);
  }
  addFavourite(id: string): void {
    this._wishlistService.addWichlist(id).subscribe({
      next: (response) => {
        this.wishListData = response.data;
        this._wishlistService.wishListNumber.next(response.data.length);
        this._notifierService.notify('success', `${response.message}`);
      },
    });
  }
  removeFavourite(id: string): void {
    this._wishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        this.wishListData = response.data;
        this._wishlistService.wishListNumber.next(response.data.length);
        // Remove From Dom
        if (this.InWshListPadge) {
          const afterDelte = this.allProducts.filter((item: any) =>
            this.wishListData.includes(item._id)
          );
          this.allProducts = afterDelte;
        }
        this._notifierService.notify('warning', `${response.message}`);
      },
    });
  }
}
