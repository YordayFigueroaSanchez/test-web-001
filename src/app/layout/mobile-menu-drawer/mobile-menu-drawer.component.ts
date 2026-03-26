import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../shared/interfaces';

@Component({
  selector: 'app-mobile-menu-drawer',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (isOpen()) {
      <div id="mobile-menu" class="fixed inset-0 z-40 lg:hidden">
        <div
          class="fixed inset-0 bg-black/50"
          (click)="close()"
          aria-hidden="true"
        ></div>

        <nav
          class="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-xl
                 animate-slide-in-right p-6"
          role="navigation"
          aria-label="Mobile navigation"
          (keydown.escape)="close()"
        >
          <div class="flex justify-end mb-6">
            <button
              type="button"
              (click)="close()"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                     focus-visible:outline-2 focus-visible:outline-primary-500"
              aria-label="Close menu"
            >
              <svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul class="space-y-1">
            @for (item of navItems(); track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  (click)="close()"
                  class="block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                         hover:text-primary-600 dark:hover:text-primary-400
                         focus-visible:outline-2 focus-visible:outline-primary-500"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>
    }
  `,
})
export class MobileMenuDrawerComponent {
  readonly isOpen = input(false);
  readonly navItems = input<NavItem[]>([]);
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
