import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerSize } from '../../shared/interfaces';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule],
  template: `
    <div
      role="status"
      [attr.aria-label]="ariaLabel()"
      class="inline-flex items-center justify-center"
    >
      <p-progressSpinner
        [style]="{ 'width': widthMap(), 'height': heightMap() }"
        strokeWidth="4"
        fill="none"
        animationDuration=".5s"
      ></p-progressSpinner>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </div>
  `,
})
export class SpinnerComponent {
  readonly size = input<SpinnerSize>('md');
  readonly ariaLabel = input('Loading');

  widthMap(): string {
    const map: Record<SpinnerSize, string> = {
      sm: '1.5rem',
      md: '3rem',
      lg: '4.5rem',
    };
    return map[this.size()];
  }

  heightMap(): string {
    const map: Record<SpinnerSize, string> = {
      sm: '1.5rem',
      md: '3rem',
      lg: '4.5rem',
    };
    return map[this.size()];
  }
}
