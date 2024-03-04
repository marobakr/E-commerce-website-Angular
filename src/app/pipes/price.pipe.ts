import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(product: Products[], priceNumber: number): Products[] {
    return product.filter((item) => {
      return item.price <= priceNumber;
    });
  }
}
