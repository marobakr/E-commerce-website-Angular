import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/wishlist.service';
import { Products } from 'src/app/interfaces/products';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(private _wishlistService: WishlistService) {}
  wishListProducts: Products[] = [];
  isLoding: boolean = false;
  ngOnInit(): void {
    this.dsiplayWishList();
  }

  dsiplayWishList() {
    this._wishlistService.getWishlistItem().subscribe({
      next: (response) => {
        this.wishListProducts = response.data;
        this.getOffer(this.wishListProducts);
      },
    });
  }

  getOffer(products: Products[]) {
    products.forEach((item) => {
      if (item.priceAfterDiscount) {
        item.offer = Math.round(
          ((item.price - item.priceAfterDiscount) / item.price) * 100
        );
      } else {
        const randomDiscount = Math.floor(Math.random() * 50) + 1;
        item.offer = randomDiscount;
      }
    });
  }
}
