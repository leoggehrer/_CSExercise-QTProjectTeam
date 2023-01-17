import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app-core/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { LoginComponent } from './login/login.component';
import { SetPasswordComponent } from './set-password/set-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
  },
  {
    path: 'activate-account',
    component: SetPasswordComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
