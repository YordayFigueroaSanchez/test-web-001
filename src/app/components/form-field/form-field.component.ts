import { Component, input } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div class="mb-4">
      <label
        [for]="fieldId()"
        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
      >
        {{ label() }}
        @if (required()) {
          <span class="text-red-500 ml-1" aria-hidden="true">*</span>
        }
      </label>

      @if (type() === 'textarea') {
        <textarea
          [id]="fieldId()"
          [placeholder]="placeholder()"
          [attr.aria-required]="required()"
          [attr.aria-invalid]="!!errorMessage()"
          [attr.aria-describedby]="errorMessage() ? fieldId() + '-error' : null"
          class="w-full px-4 py-2.5 rounded-lg border transition-colors duration-200
                 bg-white dark:bg-gray-800
                 border-gray-300 dark:border-gray-600
                 text-gray-900 dark:text-gray-50
                 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                 placeholder-gray-400 dark:placeholder-gray-500"
          [class.border-red-500]="!!errorMessage()"
          [class.dark:border-red-400]="!!errorMessage()"
          rows="4"
        ></textarea>
      } @else {
        <input
          [id]="fieldId()"
          [type]="type()"
          [placeholder]="placeholder()"
          [attr.aria-required]="required()"
          [attr.aria-invalid]="!!errorMessage()"
          [attr.aria-describedby]="errorMessage() ? fieldId() + '-error' : null"
          class="w-full px-4 py-2.5 rounded-lg border transition-colors duration-200
                 bg-white dark:bg-gray-800
                 border-gray-300 dark:border-gray-600
                 text-gray-900 dark:text-gray-50
                 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                 placeholder-gray-400 dark:placeholder-gray-500"
          [class.border-red-500]="!!errorMessage()"
          [class.dark:border-red-400]="!!errorMessage()"
        />
      }

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
