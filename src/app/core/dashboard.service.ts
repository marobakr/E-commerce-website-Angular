import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/paseApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _httpClient: HttpClient) {}

  allOrders(numOfPadge: number = 1): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/orders`, {
      params: { page: numOfPadge },
    });
  }
  allUsers(numOfPadge: number = 1): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/users`, {
      params: { page: numOfPadge },
    });
  }
}
