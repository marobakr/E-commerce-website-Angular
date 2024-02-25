import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor(private _httpClient: HttpClient) {}
  allProducts(numOfPadge: number = 1): Observable<any> {
    return this._httpClient.get(
      `${baseUrl}/api/v1/products?page=${numOfPadge}`
    );
  }

  allCategories(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/categories`);
  }
  getDetails(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/products/${id}`);
  }
}
