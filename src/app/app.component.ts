import { Component } from '@angular/core';
import { ModalWindowService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-app';

  constructor(private modalService: ModalWindowService) {}

  open(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
    });
  }

  open2(): void {
    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'Board',
      action: 'delete',
    });
  }
}
