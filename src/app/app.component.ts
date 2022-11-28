import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-app';

  isLoading = false;

  constructor(
    public loaderService: LoaderService,
    private cdref: ChangeDetectorRef,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(isLoad => {
      this.isLoading = isLoad;
      this.cdref.detectChanges();
    });
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(lang);
  }
}
