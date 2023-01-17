import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './routing/app-routes';
import { AuthRoutes, CommonRoutes } from './routing/common-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([...AppRoutes, ...AuthRoutes, ...CommonRoutes]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
