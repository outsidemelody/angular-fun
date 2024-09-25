import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';
import { PageTitleStrategy } from "./page-title-strategy.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
  ]
};
