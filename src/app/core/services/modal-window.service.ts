import { Injectable } from '@angular/core';
import { ModalWindowData } from '@core/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  modalHandler$: Subject<ModalWindowData> = new Subject<ModalWindowData>();
}
