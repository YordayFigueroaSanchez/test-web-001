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
      class="relative min-h-[82vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.12),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(26,26,26,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.18),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(245,240,232,0.08),transparent_40%)]"></div>
      <div class="relative max-w-5xl mx-auto text-center">
        <p class="text-xs uppercase tracking-[0.24em] text-gold-400 mb-5">Aura Studio</p>
        <h1
          id="hero-heading"
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-matte-black-200 dark:text-bone-200 mb-6 leading-tight"
        >
          Design Presence That Speaks Before You Do
        </h1>
        <p class="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          We craft premium digital experiences where strategy, visual rhythm, and performance
          move as one. Every interaction is intentional. Every detail carries brand value.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <app-button variant="primary" size="lg">Start Your Signature Project</app-button>
          <app-button variant="outline" size="lg">Explore Our Method</app-button>
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
          class="text-3xl sm:text-4xl font-bold text-center text-matte-black-200 dark:text-bone-200 mb-12"
        >
          Built For Distinctive Brands
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
      class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-bone-100 dark:bg-matte-black-100"
      aria-labelledby="cta-heading"
    >
      <div class="max-w-3xl mx-auto text-center">
        <h2
          id="cta-heading"
          class="text-3xl font-bold text-matte-black-200 dark:text-bone-200 mb-4"
        >
          Ready To Elevate Your Brand Presence?
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300 mb-8">
          Let us shape a digital experience that feels premium, performs fast,
          and converts with clarity.
        </p>
        <app-button variant="primary" size="lg">Book A Creative Call</app-button>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly features: FeatureItem[] = [
    {
      title: 'Editorial Direction',
      description: 'Luxury-inspired layout systems with clear hierarchy and narrative pacing.',
    },
    {
      title: 'Conversion Architecture',
      description: 'Strategic section flow and CTA framing designed to turn attention into action.',
    },
    {
      title: 'Performance By Default',
      description: 'Fast, resilient frontends with accessibility and SEO built in from day one.',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Aura Studio — Premium Digital Direction',
      description: 'Premium digital experiences for modern brands: strategy, design systems, and high-performance delivery.',
      route: '/',
    });
  }
}
