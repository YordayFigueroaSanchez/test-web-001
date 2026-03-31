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
      class="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
      [class]="scrollService.isScrolled()
        ? 'bg-bone-100/95 dark:bg-matte-black-100/95 backdrop-blur-md border-b border-gold-400/20 shadow-sm'
        : 'bg-bone-200/80 dark:bg-matte-black-200/80 backdrop-blur-sm'"
    >
      <nav
        class="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        <!-- Wordmark -->
        <a
          routerLink="/"
          class="group flex flex-col leading-none
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          <span class="text-[10px] tracking-widest font-medium text-gold-400 uppercase">Aura</span>
          <span class="text-sm tracking-widest font-bold text-matte-black-200 dark:text-bone-200 uppercase
                       group-hover:text-gold-400 dark:group-hover:text-gold-300 transition-colors duration-200">Studio</span>
        </a>

        <!-- Desktop nav -->
        <ul class="hidden lg:flex items-center gap-1">
          @for (item of navItems; track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                #desktopRla="routerLinkActive"
                routerLinkActive="text-gold-400"
                [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                [attr.aria-current]="desktopRla.isActive ? 'page' : null"
                class="px-3 py-2 text-sm font-medium tracking-wide rounded-md transition-colors duration-200
                       text-neutral-700 dark:text-neutral-300
                       hover:text-gold-400 dark:hover:text-gold-300
                       focus-visible:outline-2 focus-visible:outline-gold-400"
                [attr.aria-label]="item.ariaLabel"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Controls -->
        <div class="flex items-center gap-2">
          <app-theme-toggle />
          <app-language-switcher />

          <button
            type="button"
            class="lg:hidden p-2 rounded-md
                   text-neutral-700 dark:text-neutral-300
                   hover:text-gold-400 dark:hover:text-gold-300
                   hover:bg-bone-300/50 dark:hover:bg-matte-black-50/50
                   transition-colors focus-visible:outline-2 focus-visible:outline-gold-400"
            (click)="isMenuOpen.set(true)"
            [attr.aria-expanded]="isMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
