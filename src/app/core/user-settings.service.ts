import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(
    private _httpClient: HttpClient,
    private _cartService: CartService
  ) {}
  userdata: any = this._cartService.decodeUserData();
  userImagePath: BehaviorSubject<string> = new BehaviorSubject('');
  userName: BehaviorSubject<string> = new BehaviorSubject('');

  updateUserData(userData: object): Observable<any> {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe`,
      userData
    );
  }
  defualtUserData(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/users/${this.userdata.id}`);
  }

  addAdsress(userData: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/addresses`, userData);
  }
  updatePassword(newPassword: object): Observable<any> {
    return this._httpClient.put(
      `${baseUrl}/api/v1/users/changeMyPassword`,
      newPassword
    );
  }
}
