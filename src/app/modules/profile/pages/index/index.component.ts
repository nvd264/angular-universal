import { User } from '@shared/models';
import { AuthService } from '@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
   <p *ngIf="user">
      profile Works!
      Hello, {{ user.email }}
   </p>
  `,
  styles: []
})
export class IndexComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    authService.currentUserSub$.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
  }

}
