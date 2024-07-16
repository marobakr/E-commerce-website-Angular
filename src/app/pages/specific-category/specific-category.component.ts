import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';
import { Products } from 'src/app/interfaces/products';
@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css'],
})
export class SpecificCategoryComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsDataService: ProductsDataService
  ) {}
  specificCategory: Categoreis = {} as Categoreis;
  allProducts: Products[] = [];
  categoryName: null | string = '';
  productLength: number = 0;
  ngOnInit(): void {
    this.getIdSpicficCategory();
    this.SpPrOnSpCat();
  }

  ngAfterViewInit(): void {
    this._productsDataService.lengthProducts.subscribe({
      next: (length) => {
        this.productLength = length;
      },
    });
  }

  getIdSpicficCategory() {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id-category');
        const name: string | null = params.get('name');

        this.categoryName = name;
        this.displaySpcificCategory(id);
      },
    });
  }

  displaySpcificCategory(id: string | null) {
    this._productsDataService.specificCategories(id).subscribe({
      next: (respoons) => {
        this.specificCategory = respoons.data;
      },
    });
  }

  // Spcific Products On Spcific Category
  SpPrOnSpCat(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;

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
