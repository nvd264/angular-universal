import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PAGE_403_ROUTE } from '@configs/routes/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (!this.authService.isLogin) {
      this.router.navigate([PAGE_403_ROUTE]);
      return false;
    }
    return true;
  }
}
