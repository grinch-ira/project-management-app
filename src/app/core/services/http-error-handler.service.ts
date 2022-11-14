import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalWindowService } from './modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private modalService: ModalWindowService) {}

  catchErrors(err: HttpErrorResponse): void {
    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'HTTP',
      action: 'error',
      payload: {
        ...err.error,
        type: 'custom',
      },
    });
  }
}
