import { Component, input } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div class="mb-4">
      <div class="block">
        <span class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {{ label() }}
          @if (required()) {
            <span class="text-red-500 ml-1" aria-hidden="true">*</span>
          }
        </span>
        <ng-content></ng-content>
      </div>

      @if (errorMessage()) {
        <p
          [id]="fieldId() + '-error'"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {{ errorMessage() }}
        </p>
      }
    </div>
  `,
})
export class FormFieldComponent {
  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'tel' | 'textarea' | 'select'>('text');
  readonly placeholder = input('');
  readonly errorMessage = input('');
  readonly required = input(false);
  readonly fieldId = input(`form-field-${++nextId}`);
}
