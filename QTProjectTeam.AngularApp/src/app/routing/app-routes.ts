import { Routes } from '@angular/router';
import { AuthGuard } from '@app-core/guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
  },
];
