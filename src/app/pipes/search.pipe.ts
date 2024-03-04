import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(product: Products[], word: string): Products[] {
    return product.filter((item) => {
      return item.title.toLowerCase().includes(word.toLowerCase());
    });
  }
}
