import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
