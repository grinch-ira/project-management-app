import { Injectable } from '@angular/core';
import { Task } from '@core/models';
import { BoardsService, UsersService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  owner: string = '';

  board: string = '';

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  tasksSet$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private boardsService: BoardsService, private usersService: UsersService) {}

  getSearchResults(): void {
    this.tasks$.next(this.filterResults(this.tasksSet$.getValue()));
  }

  setTasks(tasks: Task[]): void {
    this.tasksSet$.next(tasks.filter(task => this.boardsService.hasBoard(task.boardId)));
  }

  private filterResults(tasks: Task[]): Task[] {
    return tasks
      .filter(task => this.isIncludedBoard(task))
      .filter(task => this.isIncludedUser(task));
  }

  private isIncludedBoard(task: Task): boolean {
    return this.board ? task.boardId === this.board : true;
  }

  private isIncludedUser(task: Task): boolean {
    if (this.owner === 'DELETED_USER') {
      return this.usersService.isDeletedUser(task.userId as string);
    }
    return this.owner
      ? task.userId === this.owner || task.users.includes(this.owner)
      : true;
  }
}
