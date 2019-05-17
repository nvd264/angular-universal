import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutes } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
