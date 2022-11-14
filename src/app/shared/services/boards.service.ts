import { Injectable } from '@angular/core';
import { Board } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  addBoard(board: Board): void {
    const boards = this.boards$.getValue();
    boards.push(board);
    this.boards$.next(boards);
  }

  deleteBoard(id: string): void {
    const boards = this.boards$.getValue();
    this.boards$.next(boards.filter(board => board._id !== id));
  }
}
