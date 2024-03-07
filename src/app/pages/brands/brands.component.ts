import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _viewportScroller: ViewportScroller
  ) {}
  allBrands: Categoreis[] = [];
  brandsLength: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  ngOnInit(): void {
    this.displayBrand();
  }
  displayBrand(): void {
    this._productsDataService.allBrand().subscribe({
      next: (response) => {
        this.allBrands = response.data;
        this.brandsLength = response.data.length;
        this.pageSize = response.metadata.limit;
        this.totalItems = response.results;
        this.currentPage = response.metadata.currentPage;
      },
    });
  }
  pageChanged(event: any) {
    this._productsDataService.allBrand(event).subscribe({
      next: (response) => {
        this.allBrands = response.data;
        this.brandsLength = response.data.length;
        this.pageSize = response.metadata.limit;
        this.totalItems = response.results;
        this.currentPage = response.metadata.currentPage;
        this._viewportScroller.scrollToPosition([0, 0]);
      },
    });
  }
}
