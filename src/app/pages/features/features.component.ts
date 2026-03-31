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
        <p class="text-xs text-center uppercase tracking-[0.22em] text-gold-400 mb-3">Capabilities</p>
        <h1
          id="features-heading"
          class="text-4xl font-bold text-matte-black-200 dark:text-bone-200 mb-6 text-center"
        >
          Signature Services For Modern Brands
        </h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          From strategic positioning to interface systems, each capability is designed
          to sharpen your message and strengthen your digital conversion path.
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
          class="text-3xl font-bold text-matte-black-200 dark:text-bone-200 mb-4"
        >
          Ready To Build Your Next Digital Chapter?
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          Let us align your brand story, UX direction, and frontend performance in one cohesive execution.
        </p>
        <app-button variant="primary" ariaLabel="Schedule a strategy call">Schedule A Strategy Call</app-button>
      </section>
    </div>
  `,
})
export class FeaturesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly features: FeatureItem[] = [
    {
      title: 'Brand Strategy',
      description: 'Positioning frameworks that align voice, visuals, and business objectives.',
      icon: '◇',
    },
    {
      title: 'UX Direction',
      description: 'Clear user journeys and interaction models that reduce friction and increase clarity.',
      icon: '◎',
    },
    {
      title: 'Design Systems',
      description: 'Scalable visual tokens and reusable UI foundations for consistent product evolution.',
      icon: '▦',
    },
    {
      title: 'Frontend Engineering',
      description: 'Angular-first architecture focused on maintainability, accessibility, and speed.',
      icon: '⌁',
    },
    {
      title: 'SEO & Content Structure',
      description: 'Semantic content systems that improve discoverability and narrative coherence.',
      icon: '◍',
    },
    {
      title: 'Optimization & Growth',
      description: 'Continuous refinement of performance, analytics, and conversion touchpoints.',
      icon: '↗',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Aura Studio Services — Strategy, UX, Engineering',
      description: 'Discover Aura Studio capabilities across brand strategy, UX direction, design systems, and frontend delivery.',
      route: '/features',
    });
  }
}
