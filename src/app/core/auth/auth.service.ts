import { BehaviorSubject } from 'rxjs';
import { CookieService } from '@gorniv/ngx-universal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@shared/models/User';
import { AUTH_KEY, AUTH_CURRENT_USER } from '@configs/consts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSub$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.currentUserSub$ = this.getCurrentUserInCookie();
  }

  private setUserData(data: any) {
    const currentUser = {
      id: null,
      email: data.email
    } as User;
    // set token into cookies for auth
    this.cookieService.put(AUTH_KEY, data.access_token);
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
    this.http.post(environment.API_URL + environment.AUTH_LOGIN_PATH, formData, options).subscribe({
      next: res => {
        this.setUserData(res);
        this.router.navigate(['/profile'])
      },
      error: err => {
        throw Error(`User not found.`)
      }
    });
  }

  logout() {
    this.cookieService.remove(AUTH_KEY);
    this.cookieService.remove(AUTH_CURRENT_USER);
    this.currentUserSub$.next(null);
    this.router.navigate(['/'])
  }

  get isLogin() {
    return this.currentUserSub$.value;
  }
}
