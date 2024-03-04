import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _productsDataService: ProductsDataService) {}
  allCategories: Categoreis[] = [];
  categoriesLength: number = 0;
  ngOnInit(): void {
    this.displayCategories();
  }
  displayCategories() {
    this._productsDataService.allCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
        this.categoriesLength = response.data.length;
      },
    });
  }
}
