import {
  HttpClient,
  provideHttpClient,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideAnimationsAsync,
} from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import {
  provideTranslateService,
  TranslateLoader,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), TranslateStore, provideTranslateService({
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => {
        return new TranslateHttpLoader(http, './i18n/', '.json');
      },
      deps: [HttpClient]
    }
  })]
};
