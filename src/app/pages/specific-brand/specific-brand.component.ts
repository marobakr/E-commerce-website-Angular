import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';
import { Products } from 'src/app/interfaces/products';

@Component({
  selector: 'app-specific-brand',
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.css'],
})
export class SpecificBrandComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _activatedRoute: ActivatedRoute
  ) {}
  specificBrand: Categoreis = {} as Categoreis;
  allProducts: Products[] = [];
  brandName: string | null = '';
  productLength: number = 0;
  ngOnInit(): void {
    this.getIdFromRouter();
    this.SpPrOnSpBr();
  }
  ngAfterViewInit(): void {
    this._productsDataService.lengthProducts.subscribe({
      next: (length) => {
        this.productLength = length;
      },
    });
  }

  getIdFromRouter(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        const ID: string | null = params.get('id');
        const BrandName: string | null = params.get('brand-name');
        this.brandName = BrandName;
        this.displaySpcificBrand(ID);
      },
    });
  }

  displaySpcificBrand(id: string | null): void {
    this._productsDataService.specificBrand(id).subscribe({
      next: (response) => {
        this.specificBrand = response.data;
      },
    });
  }
  // Spcific Products On Spcific Brand
  SpPrOnSpBr(): void {
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
