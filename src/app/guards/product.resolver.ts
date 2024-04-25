import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsDataService } from '../core/products-data.service';
import { EMPTY } from 'rxjs';

export const productResolver: ResolveFn<boolean> = (route, state) => {
  const productsID = route.paramMap.get('id');
  const productService = inject(ProductsDataService);
  return productsID ? productService.getDetails(productsID) : EMPTY;
};
