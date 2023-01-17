import '@progress/kendo-angular-intl/locales/de/all';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Injectable, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IntlModule } from '@progress/kendo-angular-intl';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { HttpErrorInterceptor } from './interceptor/http-error-interceptor';
import { HttpTokenInterceptor } from './interceptor/http-token-interceptor';
import { HttpResponseInterceptor } from './interceptor/http-response-interceptor';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Injectable()
export class CustomMissingTranslationHandler
  implements MissingTranslationHandler
{
  handle(params: MissingTranslationHandlerParams): string {
    const comp = params.key.split('.');

    if (comp.length > 1) {
      return comp[comp.length - 1];
    } else {
      return params.key;
    }
  }
}

// Load all required data for the bg locale
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    NotificationModule,
    LayoutModule,
    DialogsModule,
    IntlModule,
    NavigationModule,
    IconsModule,
    ButtonsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
  ],
  exports: [
    IconsModule,
    NavigationModule,
    LayoutModule,
    ButtonsModule,
    TranslateModule,
    DialogsModule,
  ],
  providers: [
    //{ provide: LOCALE_ID, useValue: 'de' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
    {
      provide: MissingTranslationHandler,
      useClass: CustomMissingTranslationHandler,
    },
  ],
})
export class AppCoreModule {
  constructor(
    @Optional() @SkipSelf() appCoreModule: AppCoreModule,
    private translateService: TranslateService
  ) {
    if (appCoreModule) {
      throw new TypeError(`AppCore!!! is imported twice.`);
    }
    translateService.setDefaultLang('de');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    '.json?v=' + Date.now()
  );
}
