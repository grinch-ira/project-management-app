import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '@core/models';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() boardData!: Board;

  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate([
      'board',
      this.boardData._id,
    ]);
  }
}
