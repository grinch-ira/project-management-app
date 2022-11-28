import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '@core/models';
import { ModalWindowService } from '@core/services';
import { HttpResponseService } from '@core/services/http-response.service';
import { BoardsService } from '@shared/services';
import { EMPTY, switchMap, take } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent {
  @Input() boardData!: Board;

  options: AnimationOptions = {
    path: `/assets/animations/${this.boardsService.getRandomNumber()}.json`,
  };

  constructor(
    private router: Router,
    private modalService: ModalWindowService,
    private boardsService: BoardsService,
    private apiService: HttpResponseService
  ) {}

  navigate(): void {
    this.router.navigate([
      'board',
      this.boardData._id,
    ]);
  }

  delete($event: Event): void {
    $event.stopPropagation();
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'Board',
      action: 'delete',
      payload: this.boardData.title,
    });

    this.modalService.modalEmitter$
      .pipe(
        take(1),
        switchMap(result => {
          if (result === 'confirm') {
            return this.apiService.deleteBoard(this.boardData._id);
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.boardsService.deleteBoard(this.boardData._id);
      });
  }
}
