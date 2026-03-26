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
        <h1
          id="about-heading"
          class="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6"
        >
          About Us
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          We are a team dedicated to creating modern, accessible web experiences that delight users.
        </p>
      </section>

      <section aria-labelledby="mission-heading" class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2
              id="mission-heading"
              class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Our Mission
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              To deliver high-quality, accessible digital experiences that empower businesses and engage their audiences.
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Vision</h2>
            <p class="text-gray-600 dark:text-gray-400">
              A world where every website is accessible, performant, and beautiful by default.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-heading">
        <h2
          id="team-heading"
          class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8"
        >
          Our Team
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
    { name: 'Jane Doe', role: 'CEO & Founder', imageSrc: '', imageAlt: 'Photo of Jane Doe' },
    { name: 'John Smith', role: 'CTO', imageSrc: '', imageAlt: 'Photo of John Smith' },
    { name: 'Maria Garcia', role: 'Lead Designer', imageSrc: '', imageAlt: 'Photo of Maria Garcia' },
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'About Us — test-web-001',
      description: 'Learn about our team, mission, and vision.',
    });
  }
}
