import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import { feadToggle } from 'src/app/shared/animations/toggle-fade';
import { BtncartComponent } from 'src/app/shared/btncart/btncart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [feadToggle],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _cartService: CartService,
    private _notifierService: NotifierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  @Input() showPaginations: boolean = true;

  allProducts: Products[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  autoplaySlider: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    margin: 8,
    autoplay: this.autoplaySlider,
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
  // ❌ in prooogress
  // startAutoplay() {
  //   this.autoplaySlider = true;
  //   this.changeDetectorRef.detectChanges();
  // }

  // stopAutoplay() {
  //   this.autoplaySlider = false;
  //   this.changeDetectorRef.detectChanges();
  // }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
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
    });
  }
  pageChanged(event: any) {
    this._productsDataService.allProducts(event).subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
      },
    });
  }
}
