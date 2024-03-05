import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import { feadToggle } from 'src/app/shared/animations/toggle-fade';
import { BtncartComponent } from 'src/app/shared/btncart/btncart.component';

@Component({
  selector: 'app-some-products',
  templateUrl: './some-products.component.html',
  styleUrls: ['./some-products.component.css'],
  animations: [feadToggle],
})
export class SomeProductsComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _cartService: CartService,
    private _notifierService: NotifierService
  ) {}
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
  startAutoplay() {
    this.owlElement.options.dots = true;
  }

  stopAutoplay() {
    this.owlElement.options.dots = false;
  }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data.slice(0, 12);
      },
    });
  }

  addProduct(_id: string, btnComponent: BtncartComponent): void {
    btnComponent.isLoding = true;
    this._cartService.addToCart(_id).subscribe({
      next: (respons) => {
        console.log(respons);
        this._cartService.cartNumber.next(respons.numOfCartItems);
        this._notifierService.notify('success', `${respons.message}`);
        btnComponent.isLoding = false;
      },
    });
  }
}
