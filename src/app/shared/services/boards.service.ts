import { Injectable } from '@angular/core';
import { Board } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

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

  getOwnerName(boardId: string): string {
    const ownerId =
      this.boards$.getValue().find(board => board._id === boardId)?.owner || '';

    return this.usersService.getName(ownerId);
  }
}
