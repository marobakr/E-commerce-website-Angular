import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';

@Injectable({
  providedIn: 'root',
})
export class ForgetpasswordService {
  constructor(private _httpClient: HttpClient) {}
  forgetPassword(userEMail: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/forgotPasswords`, {
      email: userEMail,
    });
  }
  verifyCode(code: string): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/verifyResetCode`, {
      resetCode: code,
    });
  }
  resetPassword(newUserData: object): Observable<any> {
    return this._httpClient.put(
      `${baseUrl}/api/v1/auth/resetPassword`,
      newUserData
    );
  }
}
