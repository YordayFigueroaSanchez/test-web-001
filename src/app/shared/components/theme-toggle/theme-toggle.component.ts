import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      (click)="themeService.toggleTheme()"
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if (themeService.isDark()) {
        <span class="text-xl" aria-hidden="true">☀️</span>
      } @else {
        <span class="text-xl" aria-hidden="true">🌙</span>
      }
    </button>
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
