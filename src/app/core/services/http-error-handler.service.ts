import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ModalWindowService } from './modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private modalService: ModalWindowService) {}

  catchErrors(err: HttpErrorResponse): Observable<never> {
    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'HTTP',
      action: 'error',
      payload: {
        ...err.error,
        type: 'custom',
      },
    });
    return EMPTY;
  }
}
