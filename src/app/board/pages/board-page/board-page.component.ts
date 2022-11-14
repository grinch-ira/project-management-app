import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from '@core/models';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boardId!: string;

  columns: Column[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.boardId = params['id'];
    });

    //TODO: Release real columns request
    this.columns = this.getColumns();
  }

  goToMain(): void {
    this.router.navigate(['main']);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray<Column>(this.columns, event.previousIndex, event.currentIndex);

    this.updateOrder();

    //TODO: Send to server actual set of columns
  }

  getArrOfIds(): string[] {
    return this.columns.map(col => `CID_${col._id}`);
  }

  private updateOrder(): void {
    this.columns = this.columns.map((col, i) => {
      return {
        ...col,
        order: i,
      };
    });
  }

  private getColumns(): Column[] {
    return new Array(6)
      .fill({
        _id: '',
        title: '',
        order: NaN,
        boardId: '',
      })
      .map((_, i: number) => {
        return {
          _id: `CID${i}`,
          title: `Column #${i}`,
          order: i,
          boardId: this.boardId,
        };
      });
  }
}
