import { Products } from '../interfaces/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(products: Products[], key: string): Products[] {
    switch (key) {
      case 'sort':
        products.sort((a, b) => a.title.localeCompare(b.title));
        return products;
      case 'reverse':
        products
          .sort((a, b) => a.title.toString().localeCompare(b.title))
          .reverse();
        return products;
      case 'lowest':
        products.sort((a, b) =>
          a.price.toString().localeCompare(b.price.toString())
        );
        return products;
      case 'highest':
        products
          .sort((a, b) => a.price.toString().localeCompare(b.price.toString()))
          .reverse();
        return products;
      default:
        return products;
    }
  }
}
