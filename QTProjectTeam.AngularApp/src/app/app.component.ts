import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AuthenticatedUser } from '@app-core-models/base/account/authenticated-user';
import { AuthService } from '@app-core-services/auth.service';
import { environment } from '@environment/environment';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Subscription } from 'rxjs';

type NavigationDrawerItem = DrawerItem & {
  titleTranslationKey?: string;
  path?: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  authenticatedUser: AuthenticatedUser;
  versionNumber = environment.versionNumber;
  isAuthenticated = false;
  sideMenuExpanded = true;
  accountMenuExpanded = false;
  notificationMenuExpanded = false;

  public notifications: any[] = ['test']; //TODO
  public items: NavigationDrawerItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit(): void {
    this.runUpdateCheck();

    this.authSub = this.authService.authenticatedUserChanged.subscribe(
      (user) => {
        this.authenticatedUser = user;
        this.isAuthenticated = user != null;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  private runUpdateCheck() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (
          confirm(
            "You're using an old version of the control panel. Want to update?"
          )
        ) {
          window.location.reload();
        }
      });
    }
  }
}
