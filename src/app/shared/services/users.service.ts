import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  getName(id: string): string {
    return this.users$.getValue().find(user => user._id === id)?.name || 'DELETED_USER';
  }

  isDeletedUser(id: string): boolean {
    return !this.users$.getValue().find(user => user._id === id);
  }
}
