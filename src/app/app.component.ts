import { Component } from '@angular/core';
import { ModalWindowService } from '@core/services';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-app';

  constructor(private modalService: ModalWindowService) {}

  open(): void {
    console.log({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
    });

    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
    });

    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
      console.log('Result is', result);
    });
  }

  open2(): void {
    console.log({
      type: 'message',
      emitter: 'Board',
      action: 'delete',
    });

    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'Board',
      action: 'delete',
    });

    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
      console.log('Result is', result);
    });
  }
}
