import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app-shared/app-shared.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';

import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [AppSharedModule, AuthRoutingModule],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    ChangePasswordComponent,
  ],
})
export class AuthModule {}
