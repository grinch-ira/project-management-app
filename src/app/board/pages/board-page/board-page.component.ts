import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnDialogComponent } from '@board/components';
import { BoardService } from '@board/services';
import { Column } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boardId!: string;

  columns: Column[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: HttpResponseService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.boardId = params['id'];
    });

    //TODO: Release real columns request
    this.boardService.columns.subscribe(cols => {
      this.columns = cols;
    });

    this.getColumns();
  }

  goToMain(): void {
    this.router.navigate(['main']);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      // Create copy of columns array
      const columnsSetCopy = [...this.columns];

      // Update state
      moveItemInArray<Column>(this.columns, event.previousIndex, event.currentIndex);

      // Send  array to server
      this.apiService
        .updateSetOfColumns(this.boardService.getNewColumnOrders())
        .subscribe(res => {
          if (typeof res === 'number') {
            // If there is error, restore previous state
            this.boardService.columns.next(columnsSetCopy);
          }
        });
    }
  }

  getArrOfIds(): string[] {
    return this.columns.map(col => `CID_${col._id}`);
  }

  private updateOrder(): void {
    this.columns.forEach((col, i) => {
      col.order = i;
    });
  }

  private getColumns(): void {
    setTimeout(() => {
      this.apiService.getAllColumns(this.boardId).subscribe(cols => {
        if (cols instanceof Array) {
          this.boardService.columns.next(cols.sort((a, b) => a.order - b.order));
          this.boardService.fillTaskObject();
        }
      });
    }, 0);
  }

  openDialogColumn(): void {
    this.dialog.open(ColumnDialogComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }
}
