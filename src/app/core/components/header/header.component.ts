import { Component } from '@angular/core';
import { HttpResponseService } from '@core/services/http-response.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogIn = false;

  isLogInBehavior = this.httpResponse.isLogIn$.subscribe(value => {
    this.isLogIn = value;
    return value;
  });

  constructor(private httpResponse: HttpResponseService) {}
}
