import '@progress/kendo-angular-intl/locales/bg/all';

import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app-shared/app-shared.module';
import { NotFoundComponent } from './common/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [AppSharedModule],
  exports: [],
})
export class AppPagesModule {}
