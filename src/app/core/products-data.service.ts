import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { HandelErorrService } from './handel-erorr.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor(
    private _httpClient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}
  allProducts(numOfPadge: number = 1): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/v1/products`, {
        params: { page: numOfPadge },
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);

  getDetails(id: string): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/v1/products/${id}`)
      .pipe(catchError(this._handelErorrService.logErorr));
  }
  allCategories(): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/v1/categories`)
      .pipe(catchError(this._handelErorrService.logErorr));
  }
  specificCategories(id: string | null): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/v1/categories/${id}`)
      .pipe(catchError(this._handelErorrService.logErorr));
  }
  allBrand(numOfPadge: number = 1): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/v1/brands`, {
        params: { page: numOfPadge },
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }
  specificBrand(id: string | null): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/brands/${id}`);
  }
}
