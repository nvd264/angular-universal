import { AuthService } from '@core/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styles: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  submit() {
    this.authService.login(this.username, this.password);
  }

}
