import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'categories',
})
export class CategoriesPipe implements PipeTransform {
  transform(product: Products[], word: string): Products[] {
    return product.filter((item) => {
      if (word === 'all') {
        return item;
      }
      return item.category.name.toLowerCase().includes(word.toLowerCase());
    });
  }
}
