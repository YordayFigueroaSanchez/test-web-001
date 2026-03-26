import { Component, input } from '@angular/core';
import { CardVariant } from '../../shared/interfaces';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <article
      class="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300
             bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
    >
      @if (imageSrc()) {
        <img
          [src]="imageSrc()"
          [alt]="imageAlt()"
          [width]="640"
          [height]="360"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
      }
      <div class="p-6">
        @if (title()) {
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">{{ title() }}</h3>
        }
        @if (description()) {
          <p class="text-gray-600 dark:text-gray-400">{{ description() }}</p>
        }
        <ng-content />
      </div>
    </article>
  `,
})
export class CardComponent {
  readonly variant = input<CardVariant>('feature');
  readonly imageSrc = input<string | undefined>(undefined);
  readonly imageAlt = input('');
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
}
