import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'brand',
})
export class BrandPipe implements PipeTransform {
  transform(products: Products[], brand: string): Products[] {
    return products.filter((item) => {
      if (brand === 'all') {
        return item;
      }
      return item.brand.name.toLowerCase().includes(brand.toLowerCase());
    });
  }
}
