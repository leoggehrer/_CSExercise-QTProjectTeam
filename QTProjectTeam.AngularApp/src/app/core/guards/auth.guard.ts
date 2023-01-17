import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app-core-services/auth.service';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated.pipe(
      filter((value) => value !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          if (route.routeConfig?.path) {
            this.router.navigate(['auth', 'login'], {
              queryParams: { returnUrl: route.routeConfig.path },
            });
          } else {
            this.router.navigateByUrl('/auth/login');
          }
          return false;
        }
      })
    );
  }
}
