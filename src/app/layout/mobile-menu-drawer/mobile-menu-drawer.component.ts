import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../shared/interfaces';

@Component({
  selector: 'app-mobile-menu-drawer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isOpen()) {
      <div id="mobile-menu" class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu dialog">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-matte-black-200/70 backdrop-blur-sm"
          (click)="close()"
          aria-hidden="true"
        ></div>

        <!-- Drawer panel -->
        <nav
          class="fixed top-0 right-0 bottom-0 w-72
                 bg-bone-200 dark:bg-matte-black-100
                 border-l border-gold-400/20 shadow-2xl
                 animate-slide-in-right flex flex-col p-6"
          role="navigation"
          aria-label="Mobile navigation"
          tabindex="-1"
          (keydown.escape)="close()"
        >
          <!-- Drawer header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <span class="block text-[10px] tracking-widest font-medium text-gold-400 uppercase">Aura</span>
              <span class="block text-sm tracking-widest font-bold text-matte-black-200 dark:text-bone-200 uppercase">Studio</span>
            </div>
            <button
              type="button"
              #closeButton
              (click)="close()"
              class="p-2 rounded-full
                     text-neutral-600 dark:text-neutral-400
                     hover:text-gold-400 dark:hover:text-gold-300
                     hover:bg-bone-300/50 dark:hover:bg-matte-black-50/50
                     transition-colors focus-visible:outline-2 focus-visible:outline-gold-400"
              aria-label="Close menu"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Nav items -->
          <ul class="flex-1 space-y-1">
            @for (item of navItems(); track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  #mobileRla="routerLinkActive"
                  routerLinkActive="text-gold-400"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  [attr.aria-current]="mobileRla.isActive ? 'page' : null"
                  (click)="close()"
                  class="flex items-center px-3 py-3 text-sm font-medium tracking-wide rounded-lg
                         text-neutral-700 dark:text-neutral-300
                         hover:text-gold-400 dark:hover:text-gold-300
                         hover:bg-bone-300/50 dark:hover:bg-matte-black-50/50
                         transition-all duration-200
                         focus-visible:outline-2 focus-visible:outline-gold-400"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>

          <!-- Tagline -->
          <div class="pt-6 border-t border-neutral-300 dark:border-neutral-800">
            <p class="text-xs text-neutral-500 dark:text-neutral-600 tracking-widest uppercase text-center">
              Luxury. Minimal. Premium.
            </p>
          </div>
        </nav>
      </div>
    }
  `,
})
export class MobileMenuDrawerComponent {
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  readonly isOpen = input(false);
  readonly navItems = input<NavItem[]>([]);
  readonly closed = output<void>();

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        queueMicrotask(() => this.closeButton()?.nativeElement.focus());
      }
    });
  }

  close(): void {
    this.closed.emit();
  }
}
