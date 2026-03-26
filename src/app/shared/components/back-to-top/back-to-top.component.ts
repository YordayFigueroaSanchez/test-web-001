import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    @if (scrollService.showBackToTop()) {
      <button
        type="button"
        (click)="scrollService.scrollToTop()"
        class="fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg
               bg-primary-600 text-white hover:bg-primary-700
               dark:bg-primary-500 dark:hover:bg-primary-600
               transition-all duration-200 hover:scale-110
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
               animate-fade-in"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    }
  `,
})
export class BackToTopComponent {
  readonly scrollService = inject(ScrollService);
}
