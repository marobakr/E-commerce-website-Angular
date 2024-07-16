import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import { feadToggle } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [feadToggle],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _renderer2: Renderer2,
    private viewportScroller: ViewportScroller
  ) {}
  @ViewChild('categories') chosesCategory!: ElementRef;
  @ViewChild('stars') allStarts!: ElementRef;

  allProducts: Products[] = [];
  selectedBrandName: string = '';
  selectedCategoryName: any = '';
  uniqeBrands: string[] = [''];
  inputSearch: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  isLoding: boolean = false;
  selectedOption: string = 'all';
  sortBy: string = 'sort';
  ratingNumber: number = 5;
  isClassApplied: boolean = false;
  priceRange: number = 45000;
  productLength: number = 0;

  ngOnInit(): void {
    this.displayAllProducts();
    this._productsDataService.lengthProducts.subscribe({
      next: (length) => {
        this.productLength = length;
      },
    });
  }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
        this.getOffer(response.data);
        this.getUniqueBrandNames(this.allProducts);
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
        this.getOffer(response.data);
        this.viewportScroller.scrollToPosition([0, 0]);
      },
    });
  }
  getUniqueBrandNames(allItems: Products[]): void {
    let uniqeBrand: string[] = [];
    allItems.map((item) => {
      if (!uniqeBrand.includes(item.brand.name)) {
        uniqeBrand.push(item.brand.name);
      }
    });
    this.uniqeBrands = uniqeBrand;
  }
  filterCategory(event: any): void {
    this.selectedCategoryName = event.innerHTML.toLowerCase();
    const liElements =
      this.chosesCategory.nativeElement.querySelectorAll('li a ');
    liElements.forEach((anchor: HTMLElement) => {
      this._renderer2.removeClass(anchor, 'selectActive');
    });
    this._renderer2.addClass(event, 'selectActive');
  }

  onStarClick(rating: number): void {
    this.ratingNumber = rating;
    this.addActiveForStars(rating);
  }
  addActiveForStars(rating: number) {
    const parentStar = this.allStarts.nativeElement.querySelectorAll('i');

    parentStar.forEach((star: HTMLElement, index: number, arr: Array<any>) => {
      this._renderer2.removeClass(star, 'avctiveStart');
      if (rating >= index + 1) {
        this._renderer2.addClass(star, 'avctiveStart');
      }
    });
  }
  resetAllOptions(): void {
    const liElements =
      this.chosesCategory.nativeElement.querySelectorAll('li a ');
    const defult: string = 'all';
    const defultelements =
      this.chosesCategory.nativeElement.querySelector('li a ');
    this.selectedCategoryName = 'all';
    this.selectedBrandName = defult;
    this.selectedOption = defult;
    this.sortBy = 'sort';
    this.priceRange = 45000;
    this.addActiveForStars(5);
    liElements.forEach((anchor: HTMLElement) => {
      this._renderer2.removeClass(anchor, 'selectActive');
    });
    this._renderer2.addClass(defultelements, 'selectActive');
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
