import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SeoService } from '../../shared/services/seo.service';
import { TeamMember } from '../../shared/interfaces';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <section aria-labelledby="about-heading" class="mb-16">
        <p class="text-xs uppercase tracking-[0.22em] text-gold-400 mb-3">Our Philosophy</p>
        <h1
          id="about-heading"
          class="text-4xl font-bold text-matte-black-200 dark:text-bone-200 mb-6"
        >
          We Build Digital Presence With Precision
        </h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Aura Studio is a boutique team of strategists, designers, and engineers focused on
          creating premium brand experiences that feel timeless and perform flawlessly.
        </p>
      </section>

      <section aria-labelledby="mission-heading" class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2
              id="mission-heading"
              class="text-2xl font-bold text-matte-black-200 dark:text-bone-200 mb-4"
            >
              Our Mission
            </h2>
            <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              To turn ambitious brand vision into cohesive digital systems that communicate value,
              elevate trust, and support measurable growth.
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-matte-black-200 dark:text-bone-200 mb-4">Our Vision</h2>
            <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              A digital landscape where luxury aesthetics, accessibility, and technical excellence
              coexist without compromise.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-heading">
        <h2
          id="team-heading"
          class="text-3xl font-bold text-matte-black-200 dark:text-bone-200 mb-8"
        >
          The Studio Team
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (member of team; track member.name) {
            <app-card
              variant="team"
              [title]="member.name"
              [description]="member.role"
              [imageSrc]="member.imageSrc"
              [imageAlt]="member.imageAlt"
            />
          }
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly team: TeamMember[] = [
    { name: 'Elena Marlowe', role: 'Creative Director', imageSrc: '', imageAlt: 'Photo of Elena Marlowe' },
    { name: 'Noah Bennett', role: 'Technical Lead', imageSrc: '', imageAlt: 'Photo of Noah Bennett' },
    { name: 'Sofia Laurent', role: 'Brand Strategist', imageSrc: '', imageAlt: 'Photo of Sofia Laurent' },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'About Aura Studio — Craft, Strategy, Precision',
      description: 'Meet the Aura Studio team and discover our mission to create premium digital experiences with measurable impact.',
      route: '/about',
    });
  }
}
