import { HttpErrorResponse } from '@angular/common/http';
import { ClientError, ServerError } from './http.model';

export interface ModalWindowData {
  title: string;
  description: string;
  payload?: string;
}

export interface ModalWindowProperties {
  data: ModalWindowData;
  type: ModalWindowTypes;
}

export type Payload = string | ClientError | ServerError | HttpErrorResponse;

export type ModalWindowEmitters = 'User' | 'Board' | 'Column' | 'Task';
export type ModalWindowEvents = 'delete';
export type ModalWindowActions = 'logOut' | 'save';
export type ModalWindowTypes = 'confirm' | 'message';

export type ModalWindowBackendEmitter = 'HTTP';
export type ModalWindowBackendEvents = 'error';

export type ModalWindowResultType = 'confirm' | 'skip' | 'close';

export interface ModalWindowHandler {
  type: ModalWindowTypes;
  emitter: ModalWindowEmitters | ModalWindowBackendEmitter;
  action: ModalWindowEvents | ModalWindowBackendEvents | ModalWindowActions;
  payload: Payload;
}

export interface ModalWindowResponse extends ModalWindowHandler {
  result: ModalWindowResultType;
}

type ModalWindowDataObjectKeys =
  | `${ModalWindowEvents}${ModalWindowEmitters}`
  | `${ModalWindowBackendEvents}${ModalWindowBackendEmitter}`
  | `${ModalWindowActions}`;

export type ModalWindowDataObject = {
  [key in ModalWindowDataObjectKeys]: ModalWindowData;
};
