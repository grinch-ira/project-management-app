import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ModalWindowData,
  ModalWindowDataObject,
  ModalWindowHandler,
  ModalWindowResultType,
} from '@core/models';
import { Subject } from 'rxjs';

//Example: how to use this service

//Step 1: Send your action to service.
//
// this.modalService.modalHandler$.next({
//   type: 'confirm',
//   emitter: 'Board',
//   action: 'delete',
//   payload: <title of emitter or http error body>
// });

// Step 1.1: You should check err.error property.
// If it's true, return the object according to the example below
//
// this.modalService.modalHandler$.next({
//       type: 'message',
//       emitter: 'HTTP',
//       action: 'error',
//       payload: {
//         ...err.error
//         type: 'custom',
//       },
//     });
//
// If it's false, return err object according to the example below
//
// this.modalService.modalHandler$.next({
//       type: 'message',
//       emitter: 'HTTP',
//       action: 'error',
//       payload: err,
//     });

//Step 2: Get result from service
// this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
// --> Your action according to result is here
// });

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  modalHandler$: Subject<ModalWindowHandler> = new Subject<ModalWindowHandler>();

  modalEmitter$: Subject<ModalWindowResultType> = new Subject<ModalWindowResultType>();

  private readonly windowData: ModalWindowDataObject = {
    deleteBoard: {
      title: 'Delete Board',
      description: 'Do you really want to delete the board?',
    },
    deleteColumn: {
      title: 'Delete Column',
      description: 'Do you really want to delete the column?',
    },
    deleteTask: {
      title: 'Delete Task',
      description: 'Do you really want to delete the task?',
    },
    deleteUser: {
      title: 'Delete User',
      description: 'Do you really want to delete the User?',
    },
    errorHTTP: {
      title: 'HTTP Error',
      description: '',
    },
  };

  getModalData(data: ModalWindowHandler): ModalWindowData {
    if (data.action === 'delete' && data.emitter !== 'HTTP')
      return {
        ...this.windowData[`delete${data.emitter}`],
        payload: data.payload as string,
      };

    if (
      data.action === 'error' &&
      typeof data.payload !== 'string' &&
      data.payload.type === 'custom'
    )
      return {
        title: `${this.windowData.errorHTTP.title} ${data.payload.statusCode}`,
        description: `${data.payload.message}`,
      };

    if (data.action === 'error' && data.payload instanceof HttpErrorResponse)
      return {
        title: `${this.windowData.errorHTTP.title} ${data.payload.status}`,
        description: `${data.payload.message}`,
      };

    return {
      title: 'Unknown error',
      description: 'Something went wrong. Please, try again',
    };
  }
}
