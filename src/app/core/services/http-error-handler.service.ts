import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ModalWindowService } from './modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private modalService: ModalWindowService) {}

  catchErrors(err: HttpErrorResponse): Observable<never>;
  catchErrors(
    err: HttpErrorResponse,
    isReturnStatus: boolean
  ): Observable<never> | number;

  catchErrors(err: HttpErrorResponse, isReturnStatus?: boolean): unknown {
    const payload = err.error
      ? {
          ...err.error,
          type: 'custom',
        }
      : err;
    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'HTTP',
      action: 'error',
      payload: payload,
    });

    if (isReturnStatus !== undefined) {
      return isReturnStatus ? err.status : EMPTY;
    } else {
      return EMPTY;
    }
  }
}
