import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '@app-core-models/base/account/authenticated-user';
import { Logon } from '@app-core-models/base/account/logon';
import { StorageLiterals } from '@app-core/literals/storage-literals';
import { BehaviorSubject } from 'rxjs';

import { AccountService } from './http/base/account.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user?: AuthenticatedUser;

  authenticatedUserChanged = new BehaviorSubject(this.user);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.user != null
  );

  constructor(
    private accountService: AccountService,
    private storageService: StorageService
  ) {
    this.loadUserFromStorage();
  }

  public async login(
    email: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const logonData = {
      email: email,
      password: password,
    } as Logon;

    this.user = await this.accountService.login(logonData);
    if (this.user) {
      this.updateUserInStorage(this.user);
      this.notifyForUserChanged();
    }
    return this.user;
  }

  public async requestPassword(email: string): Promise<any> {
    var res = await this.accountService.requestPassword(email);

    return res;
  }

  public async setPassword(
    email: string,
    code: string,
    password: string
  ): Promise<any> {
    var res = await this.accountService.setPassword(email, code, password);

    return res;
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    var res = await this.accountService.changePassword(
      oldPassword,
      newPassword
    );

    return res;
  }

  public async logout() {
    this.removeUserFromStorage();
    this.user = undefined;
    this.notifyForUserChanged();
  }

  private notifyForUserChanged() {
    this.authenticatedUserChanged.next(this.user);
    this.isAuthenticated.next(!!this.user);
  }

  private loadUserFromStorage() {
    this.user = this.storageService.getData(
      StorageLiterals.USER
    ) as AuthenticatedUser;
    this.notifyForUserChanged();
  }

  private updateUserInStorage(user: AuthenticatedUser) {
    return this.storageService.setData(StorageLiterals.USER, user);
  }

  private removeUserFromStorage() {
    return this.storageService.remove(StorageLiterals.USER);
  }
}
