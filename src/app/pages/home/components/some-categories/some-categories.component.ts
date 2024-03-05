import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Categoreis } from 'src/app/interfaces/categoreis';
import { categoriesSlide } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-some-categories',
  templateUrl: './some-categories.component.html',
  styleUrls: ['./some-categories.component.css'],
  animations: [categoriesSlide],
})
export class SomeCategoriesComponent implements OnInit {
  constructor(private _productsDataService: ProductsDataService) {}
  allcategories: Categoreis[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    margin: 8,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 8,
      },
    },

    nav: false,
  };
  ngOnInit(): void {
    this.displayCategories();
  }

  displayCategories() {
    this._productsDataService.allCategories().subscribe({
      next: (respons) => {
        this.allcategories = respons.data;
      },
    });
  }
}
