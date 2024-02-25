import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  userToken: any = {
    token: localStorage.getItem('token'),
  };
  addToCart(prouctId: string): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: prouctId,
      },
      {
        headers: this.userToken,
      }
    );
  }
  getCartUser(): Observable<any> {
    return this._httpClient.get(
      `${baseUrl}/api/v1/cart
`,
      {
        headers: this.userToken,
      }
    );
  }

  removeCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart/${id}`, {
      headers: this.userToken,
    });
  }

  updateCartQuantity(id: string, count: number): Observable<any> {
    return this._httpClient.put(
      `${baseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      { headers: this.userToken }
    );
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart`, {
      headers: this.userToken,
    });
  }

  PaymentOnline(userData: object, idCart: string): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`,
      { shippingAddress: userData },
      { headers: this.userToken }
    );
  }

  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/orders/`);
  }
}
