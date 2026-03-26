import {
  Component,
  input,
  output,
  ElementRef,
  viewChild,
  afterRender,
  OnDestroy,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title'"
        (keydown.escape)="close()"
      >
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          (click)="close()"
          aria-hidden="true"
        ></div>
        <div
          #modalPanel
          class="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
          [@modalAnimation]
        >
          <div class="flex items-center justify-between mb-4">
            <h2
              id="modal-title"
              class="text-xl font-bold text-gray-900 dark:text-gray-50"
            >
              {{ title() }}
            </h2>
            <button
              type="button"
              (click)="close()"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <span class="text-2xl leading-none">&times;</span>
            </button>
          </div>
          <div>
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnDestroy {
  readonly isOpen = input(false);
  readonly title = input('');
  readonly closed = output<void>();

  private readonly modalPanel = viewChild<ElementRef>('modalPanel');
  private previousFocus: HTMLElement | null = null;

  constructor() {
    afterRender(() => {
      if (this.isOpen()) {
        this.previousFocus = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        this.focusFirstElement();
      } else {
        document.body.style.overflow = '';
        this.previousFocus?.focus();
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  private focusFirstElement(): void {
    const panel = this.modalPanel()?.nativeElement;
    if (panel) {
      const focusable = panel.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }
  }
}
