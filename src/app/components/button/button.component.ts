import { Component, input } from '@angular/core';
import { ButtonVariant, ButtonSize } from '../../shared/interfaces';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [class]="buttonClasses()"
      class="inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly type = input<'button' | 'submit'>('button');

  buttonClasses(): string {
    const variantMap: Record<ButtonVariant, string> = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
      secondary:
        'bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950',
      icon: 'p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800',
    };

    const sizeMap: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-5 py-2.5 text-base rounded-lg',
      lg: 'px-7 py-3.5 text-lg rounded-xl',
    };

    const disabledClass = this.disabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${variantMap[this.variant()]} ${this.variant() !== 'icon' ? sizeMap[this.size()] : ''} ${disabledClass}`;
  }
}
