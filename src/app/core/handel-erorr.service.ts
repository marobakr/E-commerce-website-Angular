import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandelErorrService {
  constructor() {}

  logErorr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: from server side', error.error.message);
    } else {
      console.error('An error occurred: from clinte side', error.error.message);
    }
    return throwError('An error ');
  }
}
