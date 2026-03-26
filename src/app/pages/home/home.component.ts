import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { SectionDividerComponent } from '../../components/section-divider/section-divider.component';
import { SeoService } from '../../shared/services/seo.service';
import { FeatureItem } from '../../shared/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CardComponent, SectionDividerComponent],
  template: `
    <section
      class="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h1
          id="hero-heading"
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6"
        >
          Welcome to <span class="text-primary-600 dark:text-primary-400">test-web-001</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          A modern, accessible, and responsive marketing website built with Angular 19 and Tailwind CSS.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <app-button variant="primary" size="lg">Get Started</app-button>
          <app-button variant="outline" size="lg">Learn More</app-button>
        </div>
      </div>
    </section>

    <app-section-divider variant="gradient" />

    <section
      class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div class="max-w-7xl mx-auto">
        <h2
          id="features-heading"
          class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12"
        >
          Features
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (feature of features; track feature.title) {
            <app-card [title]="feature.title" [description]="feature.description" />
          }
        </div>
      </div>
    </section>

    <app-section-divider variant="dots" />

    <section
      class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-gray-800"
      aria-labelledby="cta-heading"
    >
      <div class="max-w-3xl mx-auto text-center">
        <h2
          id="cta-heading"
          class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4"
        >
          Ready to get started?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Contact us today to learn more about our products and services.
        </p>
        <app-button variant="primary" size="lg">Contact Us</app-button>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly features: FeatureItem[] = [
    {
      title: 'Modern Design',
      description: 'Bold, clean, and modern UI with a focus on user experience.',
    },
    {
      title: 'Fully Responsive',
      description: 'Mobile-first design that adapts to all screen sizes seamlessly.',
    },
    {
      title: 'Accessible',
      description: 'WCAG 2.1 AAA compliant for maximum accessibility.',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'test-web-001 — Modern Marketing Website',
      description: 'A modern, accessible, and responsive marketing website built with Angular 19.',
    });
  }
}
