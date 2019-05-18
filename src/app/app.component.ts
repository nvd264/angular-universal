import { AuthService } from '@core/auth/auth.service';
import { Component } from '@angular/core';
import { User } from '@shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  constructor(private authService: AuthService) {
    authService.currentUserSub$.subscribe(currentUser => this.currentUser = currentUser)
  }

  logout() {
    this.authService.logout();
  }

}
