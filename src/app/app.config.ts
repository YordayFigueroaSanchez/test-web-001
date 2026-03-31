import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: true,
    }),
    {
      provide: APP_BASE_HREF,
      useFactory: (doc: Document) => {
        const baseHref = doc.querySelector('base')?.getAttribute('href') || '/';
        return baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
      },
      deps: [DOCUMENT],
    },
  ],
};
