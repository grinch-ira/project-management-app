import { Injectable } from '@angular/core';
import { Task } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  owner: string = '';

  isFullMatch: boolean = false;

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  tasksSet$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  getSearchResults(): void {
    this.tasks$.next(this.filterResults(this.tasksSet$.getValue()));
  }

  private filterResults(tasks: Task[]): Task[] {
    return tasks.filter(task => this.isIncludedUser(task));
  }

  private isIncludedUser(task: Task): boolean {
    return this.owner
      ? task.userId === this.owner || task.users.includes(this.owner)
      : true;
  }
}
