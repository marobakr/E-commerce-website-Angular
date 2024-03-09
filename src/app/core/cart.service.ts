import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  orderNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(prouctId: string): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/cart`, {
      productId: prouctId,
    });
  }
  getCartUser(): Observable<any> {
    return this._httpClient.get(
      `${baseUrl}/api/v1/cart
`
    );
  }

  removeCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart/${id}`, {});
  }

  updateCartQuantity(id: string, count: number): Observable<any> {
    return this._httpClient.put(`${baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart`);
  }

  PaymentOnline(userData: object, idCart: string): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/orders/checkout-session/${idCart}?url=https://e-commerce-website-angular-seven.vercel.app/`,
      { shippingAddress: userData }
    );
  }
  cashOrder(userData: object, idCart: string): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/orders/${idCart}`, {
      shippingAddress: userData,
    });
  }

  decodeUserData(): any {
    if (localStorage.getItem('token') !== null) {
      const token: any = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      return decoded;
    }
  }
  getSpeicifcOrder(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/orders/${id}`);
  }
  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/orders/user/${id}`);
  }
}
