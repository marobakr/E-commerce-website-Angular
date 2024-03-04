import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);

  getDetails(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/products/${id}`);
  }
  allCategories(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/categories`);
  }
  specificCategories(id: string | null): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/categories/${id}`);
  }
  allBrand(numOfPadge: number = 1): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/brands?page=${numOfPadge}`);
  }
  specificBrand(id: string | null): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/brands/${id}`);
  }
}
