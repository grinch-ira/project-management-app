export interface ModalWindowData {
  title: string;
  description: string;
}

export interface ModalWindowProperties {
  data: ModalWindowData;
  type: ModalWindowTypes;
}

type ModalWindowEmitters = 'User' | 'Board' | 'Column' | 'Task';
type ModalWindowEvents = 'delete';
type ModalWindowTypes = 'confirm' | 'message';
export type ModalWindowResultType = 'confirm' | 'skip' | 'close';

export interface ModalWindowHandler {
  type: ModalWindowTypes;
  emitter: ModalWindowEmitters;
  action: ModalWindowEvents;
}

export interface ModalWindowResponse extends ModalWindowHandler {
  result: ModalWindowResultType;
}

export type ModalWindowDataObject = {
  [key in `${ModalWindowEvents}${ModalWindowEmitters}`]: ModalWindowData;
};
