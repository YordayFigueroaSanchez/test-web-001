import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { MobileMenuDrawerComponent } from '../mobile-menu-drawer/mobile-menu-drawer.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { NavItem } from '../../shared/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
    MobileMenuDrawerComponent,
  ],
  template: `
    <header
      role="banner"
      class="fixed top-0 left-0 right-0 z-30 transition-shadow duration-300"
      [class.shadow-md]="scrollService.isScrolled()"
      [class]="scrollService.isScrolled()
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
        : 'bg-white dark:bg-gray-900'"
    >
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          routerLink="/"
          class="text-xl font-bold text-primary-600 dark:text-primary-400
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Home"
        >
          test-web-001
        </a>

        <ul class="hidden lg:flex items-center gap-1">
          @for (item of navItems; track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                routerLinkActive="text-primary-600 dark:text-primary-400"
                [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                class="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                       text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400
                       hover:bg-gray-50 dark:hover:bg-gray-800
                       focus-visible:outline-2 focus-visible:outline-primary-500"
                [attr.aria-label]="item.ariaLabel"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <div class="flex items-center gap-2">
          <app-theme-toggle />
          <app-language-switcher />

          <button
            type="button"
            class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                   transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
            (click)="isMenuOpen.set(true)"
            [attr.aria-expanded]="isMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <app-mobile-menu-drawer
      [isOpen]="isMenuOpen()"
      [navItems]="navItems"
      (closed)="isMenuOpen.set(false)"
    />
  `,
})
export class HeaderComponent {
  readonly scrollService = inject(ScrollService);
  readonly isMenuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/', ariaLabel: 'Go to home page' },
    { label: 'About', route: '/about', ariaLabel: 'Go to about page' },
    { label: 'Features', route: '/features', ariaLabel: 'Go to features page' },
    { label: 'Gallery', route: '/gallery', ariaLabel: 'Go to gallery page' },
    { label: 'Contact', route: '/contact', ariaLabel: 'Go to contact page' },
  ];
}
