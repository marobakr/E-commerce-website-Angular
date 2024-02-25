import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}
  signUp(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signup`, user);
  }

  signIn(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signin`, user);
  }
  sinOut(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
