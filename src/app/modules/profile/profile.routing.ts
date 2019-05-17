import { AuthGuardService } from '@core/guards/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuardService]
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
