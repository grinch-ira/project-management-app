import { Injectable } from '@angular/core';
import { Board } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  boardsOnView$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  titleFilter: string = '';

  owner: string = '';

  constructor(private usersService: UsersService) {}

  addBoard(board: Board): void {
    const boards = this.boards$.getValue();
    boards.push(board);
    this.boards$.next(boards);
  }

  deleteBoard(id: string): void {
    const boards = this.boards$.getValue();
    this.boards$.next(boards.filter(board => board._id !== id));
  }

  getName(boardId: string): string {
    return (
      this.boards$.getValue().find(board => board._id === boardId)?.title ||
      'DELETED_BOARD'
    );
  }

  hasBoard(boardId: string): boolean {
    return !!this.boards$.getValue().find(board => board._id === boardId);
  }

  getFilterResults(): void {
    this.boardsOnView$.next(this.filterResults(this.boards$.getValue()));
  }

  private filterResults(boards: Board[]): Board[] {
    return boards
      .filter(board => this.isIncludedTitle(board))
      .filter(board => this.isIncludedUser(board));
  }

  private isIncludedTitle(board: Board): boolean {
    return this.titleFilter ? board.title.toLowerCase().includes(this.titleFilter) : true;
  }

  private isIncludedUser(board: Board): boolean {
    return this.owner ? board.owner === this.owner : true;
  }
}
