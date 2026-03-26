import { Component, input } from '@angular/core';
import { SpinnerSize } from '../../shared/interfaces';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div
      role="status"
      [attr.aria-label]="ariaLabel()"
      class="inline-flex items-center justify-center"
    >
      <svg
        class="animate-spin text-primary-600 dark:text-primary-400"
        [class]="sizeClasses()"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </div>
  `,
})
export class SpinnerComponent {
  readonly size = input<SpinnerSize>('md');
  readonly ariaLabel = input('Loading');

  sizeClasses(): string {
    const map: Record<SpinnerSize, string> = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };
    return map[this.size()];
  }
}
