import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SectionDividerComponent } from '../../components/section-divider/section-divider.component';
import { SeoService } from '../../shared/services/seo.service';
import { FeatureItem } from '../../shared/interfaces';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SectionDividerComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <section aria-labelledby="features-heading" class="mb-16">
        <h1
          id="features-heading"
          class="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center"
        >
          Features
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-12">
          Discover everything our platform has to offer, crafted with modern technology and accessibility in mind.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (feature of features; track feature.title) {
            <app-card
              [title]="feature.title"
              [description]="feature.description"
            >
              <div class="text-4xl mb-4" aria-hidden="true">{{ feature.icon }}</div>
            </app-card>
          }
        </div>
      </section>

      <app-section-divider variant="gradient" />

      <section aria-labelledby="cta-heading" class="text-center py-16">
        <h2
          id="cta-heading"
          class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4"
        >
          Ready to Get Started?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who have already made the switch.
        </p>
        <app-button variant="primary" ariaLabel="Contact us to get started">Contact Us</app-button>
      </section>
    </div>
  `,
})
export class FeaturesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly features: FeatureItem[] = [
    {
      title: 'Responsive Design',
      description: 'Fully responsive layouts that look great on any device, from mobile to desktop.',
      icon: '📱',
    },
    {
      title: 'Accessibility First',
      description: 'Built to WCAG 2.1 AAA standards ensuring everyone can use your website.',
      icon: '♿',
    },
    {
      title: 'Dark Mode',
      description: 'Automatic dark mode support that respects user system preferences.',
      icon: '🌙',
    },
    {
      title: 'Blazing Fast',
      description: 'Optimized performance with lazy loading, efficient bundling, and image optimization.',
      icon: '⚡',
    },
    {
      title: 'Multi-Language',
      description: 'Built-in internationalization with support for Spanish and English.',
      icon: '🌐',
    },
    {
      title: 'Modern Stack',
      description: 'Built with Angular 19, Tailwind CSS, and the latest web standards.',
      icon: '🛠️',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Features — test-web-001',
      description: 'Explore the features of our modern, accessible, and performant web platform.',
    });
  }
}
