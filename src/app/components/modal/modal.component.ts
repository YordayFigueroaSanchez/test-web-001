import {
  Component,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <p-dialog
      [header]="title()"
      [(visible)]="dialogVisibleSignal"
      [modal]="true"
      [closable]="true"
      [draggable]="false"
      [resizable]="false"
      [breakpoints]="{ '960px': '75vw', '640px': '90vw' }"
      [baseZIndex]="1000"
    >
      <ng-content />
    </p-dialog>
  `,
})
export class ModalComponent {
  readonly isOpen = input(false);
  readonly title = input('Dialog');
  readonly closeEvent = output<void>();

  dialogVisibleSignal = signal(false);

  constructor() {
    // Sync input to signal
    effect(() => {
      this.dialogVisibleSignal.set(this.isOpen());
    });

    // Detect when dialog is closed (user clicks X or backdrop)
    effect(() => {
      if (!this.dialogVisibleSignal() && this.isOpen()) {
        this.closeEvent.emit();
      }
    });
  }
}
