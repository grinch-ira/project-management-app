import { Component, OnInit } from '@angular/core';
import { Board } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardItems: Board[] = [];

  constructor(private apiService: HttpResponseService) {}

  ngOnInit(): void {
    this.apiService.getAllBoards().subscribe(res => {
      if (res instanceof Array) {
        this.boardItems = res;
      }
    });
  }
}
