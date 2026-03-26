import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skip-nav',
  standalone: true,
  template: `
    <a
      [href]="'#' + targetId()"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
             focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg
             dark:focus:bg-gray-800 dark:focus:text-gray-50
             focus-visible:outline-2 focus-visible:outline-primary-500"
    >
      Skip to main content
    </a>
  `,
})
export class SkipNavComponent {
  readonly targetId = input('main-content');
}
