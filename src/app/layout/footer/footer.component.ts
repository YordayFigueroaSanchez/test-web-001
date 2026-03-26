import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem, SocialLink } from '../../shared/interfaces';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer
      role="contentinfo"
      class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">test-web-001</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              A modern marketing website built with Angular 19 and Tailwind CSS.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Navigation
            </h3>
            <ul class="space-y-2">
              @for (item of navItems; track item.route) {
                <li>
                  <a
                    [routerLink]="item.route"
                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                           transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Social
            </h3>
            <div class="flex gap-4">
              @for (link of socialLinks; track link.platform) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="link.ariaLabel"
                  class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                         transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
                >
                  {{ link.icon }}
                </a>
              }
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            &copy; {{ currentYear }} test-web-001. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Features', route: '/features' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Contact', route: '/contact' },
  ];

  readonly socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: '#', icon: '🐙', ariaLabel: 'Visit our GitHub' },
    { platform: 'Twitter', url: '#', icon: '🐦', ariaLabel: 'Follow us on Twitter' },
    { platform: 'LinkedIn', url: '#', icon: '💼', ariaLabel: 'Connect on LinkedIn' },
  ];
}
