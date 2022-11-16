import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// How to use service:
// 1) add (public loaderService: LoaderService) to component's constructor;
// 2) add
// <mat-spinner *ngIf = "loaderService.isLoading | async"></mat-spinner>
// to component's template

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
