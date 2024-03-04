import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import { BtncartComponent } from 'src/app/shared/btncart/btncart.component';

@Component({
  selector: 'app-base-products',
  templateUrl: './base-products.component.html',
  styleUrls: ['./base-products.component.css'],
})
export class BaseProductsComponent {
  constructor(
    private _cartService: CartService,
    private _notifierService: NotifierService,
    private _ProductsDataService: ProductsDataService
  ) {}
  previousProductLength: number | undefined;
  @Input() allProducts: Products[] = [];
  @Input() selectedCategoryName: any = '';
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
  // if i import this componets in categoryName i wll convert the col to col-4
  @Input() categoryName: boolean = false;
  // if i import this componets in mainProduct i wll convert the col to col-3
  @Input() mainProduct: boolean = false;
  @Output() emitterLength = new EventEmitter();
  @ViewChild('allItems') itemsLength!: any;

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
}
