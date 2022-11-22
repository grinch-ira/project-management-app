import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-app';

  isLoading = false;

  constructor(public loaderService: LoaderService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(isLoad => {
      this.isLoading = isLoad;
      this.cdref.detectChanges();
    });
  }
}
