import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  title = 'project-app';

  constructor(public loaderService: LoaderService, private cdref: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
