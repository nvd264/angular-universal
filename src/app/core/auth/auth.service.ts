import { BehaviorSubject } from 'rxjs';
import { CookieService } from '@gorniv/ngx-universal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { AUTH_KEY, AUTH_CURRENT_USER } from '@configs/consts';
import { Router } from '@angular/router';
import { IAuthResponse } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSub$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.currentUserSub$ = this.getCurrentUserInCookie();
  }

  private setUserData(data: IAuthResponse) {
    const currentUser = {
      id: null,
      email: data.email
    } as User;
    // set token into cookies for auth
    this.cookieService.put(AUTH_KEY, data.token);
    this.cookieService.putObject(AUTH_CURRENT_USER, currentUser)
    // set user info
    // pending...
    this.currentUserSub$.next(currentUser);
  }

  private getCurrentUserInCookie() {
    const strCurrentUser = this.cookieService.get(AUTH_CURRENT_USER);
    try {
      const currentUser = JSON.parse(strCurrentUser);
      return new BehaviorSubject<User>(currentUser as User);
    } catch (error) {
      return new BehaviorSubject<User>(null);
    }
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const options = {
      headers: headers
    };

    // Fake login
    setTimeout(() => {
      this.setUserData({
        token: 'demo-token',
        email: username
      });

      this.router.navigate(['/profile'])
    }, 3000);
  }

  logout() {
    this.cookieService.remove(AUTH_KEY);
    this.cookieService.remove(AUTH_CURRENT_USER);
    this.currentUserSub$.next(null);
    this.router.navigate(['/'])
  }

  get isLoggedIn() {
    return this.currentUserSub$.value;
  }
}
