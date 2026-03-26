import { Component, input } from '@angular/core';
import { DividerVariant } from '../../shared/interfaces';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  template: `
    @switch (variant()) {
      @case ('line') {
        <hr class="border-t border-gray-200 dark:border-gray-700 my-12" aria-hidden="true" />
      }
      @case ('dots') {
        <div class="flex justify-center gap-2 my-12" aria-hidden="true">
          <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
        </div>
      }
      @case ('gradient') {
        <div
          class="h-px my-12 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
          aria-hidden="true"
        ></div>
      }
    }
  `,
})
export class SectionDividerComponent {
  readonly variant = input<DividerVariant>('line');
}
