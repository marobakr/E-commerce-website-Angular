import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  cartSlideLeft,
  cartSlideRight,
} from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  animations: [cartSlideLeft, cartSlideRight],
})
export class MainSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
      },
    },

    nav: true,
  };
}
