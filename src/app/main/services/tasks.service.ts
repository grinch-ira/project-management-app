import { Injectable } from '@angular/core';
import { Task } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  keywords: string = '';

  owner: string = '';

  isFullMatch: boolean = false;

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  getSearchResults(tasks: Task[]): void {
    if (this.isFullMatch) {
      this.tasks$.next(this.filterResults(tasks));
    } else {
      this.tasks$.next(tasks);
    }
  }

  private filterResults(tasks: Task[]): Task[] {
    return tasks
      .filter(task => this.isIncludedKeywords(task))
      .filter(task => this.isIncludedUser(task));
  }

  private isIncludedKeywords(task: Task): boolean {
    return (
      task.title.toLowerCase().includes(this.keywords.toLowerCase()) ||
      task.description.toLowerCase().includes(this.keywords.toLowerCase())
    );
  }

  private isIncludedUser(task: Task): boolean {
    return task.userId === this.owner || task.users.includes(this.owner);
  }
}
