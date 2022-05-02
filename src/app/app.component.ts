import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grocery List';

  user: User;

  constructor(
      private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
