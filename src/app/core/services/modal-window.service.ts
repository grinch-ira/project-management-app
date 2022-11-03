import { Injectable } from '@angular/core';
import {
  ModalWindowData,
  ModalWindowDataObject,
  ModalWindowHandler,
  ModalWindowResultType,
} from '@core/models';
import { Subject } from 'rxjs';

//Example: how to use this service

//Step 1: Send your action to service
// this.modalService.modalHandler$.next({
//   type: 'message',
//   emitter: 'Board',
//   action: 'delete',
// });

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
      description: 'Are you really want to delete the board?',
    },
    deleteColumn: {
      title: 'Delete Column',
      description: 'Are you really want to delete the column?',
    },
    deleteTask: {
      title: 'Delete Task',
      description: 'Are you really want to delete the task?',
    },
    deleteUser: {
      title: 'Delete User',
      description: 'Are you really want to delete the User?',
    },
  };

  getModalData(data: ModalWindowHandler): ModalWindowData {
    return this.windowData[`${data.action}${data.emitter}`];
  }
}
