import { PROFILE_ROUTE } from '@configs/routes/profile';
import { PAGE_403_ROUTE } from '@configs/routes/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './modules/home/pages/index/index.component';
import { Page403Component } from '@core/pages/page403/page403.component';
import { AUTH_ROUTE } from '@configs/routes/auth';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: AUTH_ROUTE, loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: PAGE_403_ROUTE, component: Page403Component },
  { path: PROFILE_ROUTE, loadChildren: './modules/profile/profile.module#ProfileModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
