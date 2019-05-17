import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { ProfileRoutes } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes
  ],
  declarations: [IndexComponent]
})
export class ProfileModule { }
