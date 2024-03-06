import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/paseApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  addWichlist(id: string): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getWishlistItem(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/wishlist`);
  }
  removeWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/api/v1/wishlist/${id}`);
  }
}
