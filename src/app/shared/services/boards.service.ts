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

  randomArr: number[] = [];

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

  getRandomNumber(): number {
    if (!this.randomArr.length) {
      this.setRandomArr(11);
    }

    return this.randomArr.pop() as number;
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
    if (this.owner === 'DELETED_USER') {
      return this.usersService.isDeletedUser(board.owner);
    }
    return this.owner ? board.owner === this.owner : true;
  }

  private setRandomArr(range: number): void {
    this.randomArr = new Array(range)
      .fill(null)
      .map((_el, i) => i)
      .sort(() => Math.random() - 0.5);
  }
}
