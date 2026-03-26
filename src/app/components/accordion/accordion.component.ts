import { Component, input, signal } from '@angular/core';
import { AccordionItem } from '../../shared/interfaces';

@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `
    <div class="divide-y divide-gray-200 dark:divide-gray-700" role="presentation">
      @for (item of items(); track item.id; let i = $index) {
        <div>
          <h3>
            <button
              type="button"
              [attr.aria-expanded]="expandedIds().has(item.id)"
              [attr.aria-controls]="'accordion-panel-' + item.id"
              [id]="'accordion-header-' + item.id"
              (click)="toggle(item.id)"
              (keydown)="onKeydown($event, i)"
              class="flex items-center justify-between w-full py-4 px-2 text-left font-medium
                     text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800
                     transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary-500"
            >
              <span>{{ item.title }}</span>
              <span
                class="ml-4 shrink-0 transition-transform duration-200"
                [class.rotate-180]="expandedIds().has(item.id)"
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
          </h3>
          @if (expandedIds().has(item.id)) {
            <div
              [id]="'accordion-panel-' + item.id"
              role="region"
              [attr.aria-labelledby]="'accordion-header-' + item.id"
              class="px-2 pb-4 text-gray-600 dark:text-gray-400"
            >
              {{ item.content }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AccordionComponent {
  readonly items = input<AccordionItem[]>([]);
  readonly expandedIds = signal(new Set<string>());

  toggle(id: string): void {
    this.expandedIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const headers = (event.currentTarget as HTMLElement)
      .closest('[role="presentation"]')
      ?.querySelectorAll('button[aria-expanded]');
    if (!headers) return;

    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowDown':
        targetIndex = (index + 1) % headers.length;
        break;
      case 'ArrowUp':
        targetIndex = (index - 1 + headers.length) % headers.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = headers.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    (headers[targetIndex] as HTMLElement).focus();
  }
}
