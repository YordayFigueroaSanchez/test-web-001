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
      class="bg-matte-black-200 border-t-2 border-gold-400/40"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          <!-- Brand -->
          <div>
            <div class="mb-4">
              <span class="block text-[10px] tracking-widest font-medium text-gold-400 uppercase">Aura</span>
              <span class="block text-base tracking-widest font-bold text-bone-200 uppercase">Studio</span>
            </div>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Luxury. Minimal. Premium.<br />
              Diseño editorial de alto impacto.
            </p>
          </div>

          <!-- Nav -->
          <nav aria-label="Footer navigation">
            <h3 class="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-5">
              Navigation
            </h3>
            <ul class="space-y-3">
              @for (item of navItems; track item.route) {
                <li>
                  <a
                    [routerLink]="item.route"
                    class="text-sm text-neutral-400 hover:text-gold-300 transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-gold-400"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <!-- Connect -->
          <div>
            <h3 class="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-5">
              Connect
            </h3>
            <div class="flex gap-3">
              @for (link of socialLinks; track link.platform) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="link.ariaLabel"
                  class="w-9 h-9 flex items-center justify-center rounded-full
                         border border-neutral-700 text-neutral-400
                         hover:border-gold-400 hover:text-gold-400
                         transition-all duration-200
                         focus-visible:outline-2 focus-visible:outline-gold-400"
                >
                  <i [class]="link.icon" aria-hidden="true"></i>
                </a>
              }
            </div>
          </div>

        </div>

        <!-- Copyright -->
        <div class="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p class="text-xs text-neutral-600 tracking-wide">
            &copy; {{ currentYear }} Aura Studio. All rights reserved.
          </p>
          <p class="text-xs text-neutral-700 tracking-widest uppercase">
            Crafted with precision.
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
    { platform: 'GitHub', url: '#', icon: 'pi pi-github', ariaLabel: 'Visit our GitHub' },
    { platform: 'Instagram', url: '#', icon: 'pi pi-instagram', ariaLabel: 'Follow us on Instagram' },
    { platform: 'LinkedIn', url: '#', icon: 'pi pi-linkedin', ariaLabel: 'Connect on LinkedIn' },
  ];
}
