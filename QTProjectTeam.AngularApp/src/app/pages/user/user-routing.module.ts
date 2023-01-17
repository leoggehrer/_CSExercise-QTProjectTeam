import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app-core/guards/auth.guard';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'preferences',
    pathMatch: 'full',
  },
  {
    path: 'preferences',
    canActivate: [AuthGuard],
    component: UserPreferencesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
