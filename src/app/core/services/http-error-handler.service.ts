import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
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
    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => result);
  }
}
