import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ModalWindowService } from './modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private modalService: ModalWindowService) {}

  catchErrors(
    err: HttpErrorResponse,
    isReturnStatus: boolean = false
  ): Observable<never> | number {
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
    return isReturnStatus ? err.status : EMPTY;
  }
}
