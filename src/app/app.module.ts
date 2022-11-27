import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@material/material.module';
import { HttpResponseService } from '@core/services/http-response.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
  providers: [HttpResponseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
