import '@progress/kendo-angular-intl/locales/bg/all';

import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app-shared/app-shared.module';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserPreferencesComponent],
  imports: [AppSharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule {}
