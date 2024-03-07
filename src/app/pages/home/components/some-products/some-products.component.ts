import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import { feadToggle } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-some-products',
  templateUrl: './some-products.component.html',
  styleUrls: ['./some-products.component.css'],
  animations: [feadToggle],
})
export class SomeProductsComponent implements OnInit {
  constructor(private _productsDataService: ProductsDataService) {}
  @Input() showPaginations: boolean = true;
  @ViewChild('owlElement') owlElement: any;

  allProducts: Products[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    margin: 8,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      980: {
        items: 10,
      },
    },
    nav: false,
  };
  isLoding: boolean = false;
  ngOnInit(): void {
    this.displayAllProducts();
  }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data.slice(0, 12);
        this.getOffer(this.allProducts);
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
