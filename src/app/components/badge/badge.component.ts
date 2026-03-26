import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      [class]="variantClasses()"
    >
      {{ text() }}
    </span>
  `,
})
export class BadgeComponent {
  readonly text = input.required<string>();
  readonly variant = input<'primary' | 'secondary' | 'accent'>('primary');

  variantClasses(): string {
    const map = {
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
      secondary:
        'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
      accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200',
    };
    return map[this.variant()];
  }
}
