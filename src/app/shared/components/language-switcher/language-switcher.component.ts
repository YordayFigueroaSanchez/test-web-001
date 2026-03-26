import { Component, input } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <a
      [href]="targetUrl()"
      class="px-3 py-1.5 text-sm font-medium rounded-md
             hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200
             text-gray-700 dark:text-gray-300
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      [attr.aria-label]="currentLocale() === 'es' ? 'Switch to English' : 'Cambiar a Español'"
    >
      {{ currentLocale() === 'es' ? 'EN' : 'ES' }}
    </a>
  `,
})
export class LanguageSwitcherComponent {
  readonly currentLocale = input<'es' | 'en'>('es');

  targetUrl(): string {
    const targetLocale = this.currentLocale() === 'es' ? 'en' : 'es';
    const currentPath = typeof window !== 'undefined' ? window.location.hash : '';
    return `/${targetLocale}/${currentPath}`;
  }
}
