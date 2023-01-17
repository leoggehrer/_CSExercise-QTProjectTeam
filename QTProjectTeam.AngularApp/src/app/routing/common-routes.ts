import { Routes } from '@angular/router';
import { NotFoundComponent } from '../pages/common/not-found/not-found.component';

export const AuthRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../pages/user/user.module').then((m) => m.UserModule),
  },
];

export const CommonRoutes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
