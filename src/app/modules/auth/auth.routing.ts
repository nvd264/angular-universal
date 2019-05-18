import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoggedInGuardService } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuardService]
  }
];

export const AuthRoutes = RouterModule.forChild(routes);
