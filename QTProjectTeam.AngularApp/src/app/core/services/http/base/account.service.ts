import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '@app-core-models/base/account/authenticated-user';
import { Logon } from '@app-core-models/base/account/logon';
import { environment } from '@environment/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private BASE_URL = environment.API_BASE_URL + '/accounts';

  constructor(private httpClient: HttpClient) {}

  async login(logonData: Logon): Promise<AuthenticatedUser> {
    return firstValueFrom(
      this.httpClient.post<AuthenticatedUser>(
        this.BASE_URL + '/login',
        logonData
      )
    );
  }

  async requestPassword(email: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<AuthenticatedUser>(
        this.BASE_URL + '/requestPassword',
        {
          email: email,
        }
      )
    );
  }

  async setPassword(
    email: string,
    code: string,
    password: string
  ): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<AuthenticatedUser>(this.BASE_URL + '/setPassword', {
        email: email,
        code: code,
        password: password,
      })
    );
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<AuthenticatedUser>(
        this.BASE_URL + '/changePassword',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      )
    );
  }
}
