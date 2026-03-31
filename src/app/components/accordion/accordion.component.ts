import { Component, input, signal } from '@angular/core';
import { AccordionItem } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-accordion" role="presentation">
      @for (item of items(); track item.id; let i = $index) {
        <div class="p-accordion-tab">
          <h3 class="p-accordion-header">
            <button
              type="button"
              [attr.aria-expanded]="expandedIds().has(item.id)"
              [attr.aria-controls]="'accordion-panel-' + item.id"
              [id]="'accordion-header-' + item.id"
              (click)="toggle(item.id)"
              (keydown)="onKeydown($event, i)"
              class="p-accordion-header-link"
              [class.p-accordion-header-active]="expandedIds().has(item.id)"
            >
              <span class="p-accordion-header-title">{{ item.title }}</span>
              <span
                class="p-accordion-toggle-icon"
                [class.expanded]="expandedIds().has(item.id)"
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
              class="p-accordion-panel p-accordion-panel-active"
            >
              {{ item.content }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-accordion {
        border: 1px solid var(--p-content-border-color);
        border-radius: var(--p-border-radius);
      }

      .p-accordion-tab {
        border-bottom: 1px solid var(--p-content-border-color);

        &:last-child {
          border-bottom: none;
        }
      }

      .p-accordion-header {
        margin: 0;
      }

      .p-accordion-header-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.75rem 1rem;
        background: var(--p-content-background);
        color: var(--p-text-color);
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all var(--p-transition-duration, 200ms);

        &:hover {
          background: var(--p-highlight-background);
          color: var(--p-highlight-text-color);
        }

        &:focus {
          outline: 2px solid var(--p-primary-color);
          outline-offset: -2px;
        }

        &.p-accordion-header-active {
          background: var(--p-highlight-background);
          color: var(--p-primary-color);
        }
      }

      .p-accordion-header-title {
        flex: 1;
      }

      .p-accordion-toggle-icon {
        margin-left: 1rem;
        transform: rotate(0);
        transition: transform var(--p-transition-duration, 200ms);
        flex-shrink: 0;

        &.expanded {
          transform: rotate(180deg);
        }
      }

      .p-accordion-panel {
        padding: 1rem;
        background: var(--p-content-background);
        color: var(--p-text-color-secondary);
        display: none;

        &.p-accordion-panel-active {
          display: block;
        }
      }
    }
  `],
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
