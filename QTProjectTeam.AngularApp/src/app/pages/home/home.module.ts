import '@progress/kendo-angular-intl/locales/bg/all';

import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app-shared/app-shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [AppSharedModule],
  exports: [],
})
export class HomeModule {}
