import { Products } from '../interfaces/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starts',
})
export class StartsPipe implements PipeTransform {
  transform(products: Products[], RatingNumber: number): Products[] {
    return products.filter((item) => {
      return Math.floor(item.ratingsAverage) <= RatingNumber;
    });
  }
}
