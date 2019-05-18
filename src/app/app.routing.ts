import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './modules/home/pages/index/index.component';
import { Page403Component } from '@core/pages/page403/page403.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '403', component: Page403Component },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
