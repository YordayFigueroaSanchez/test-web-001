import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonVariant, ButtonSize } from '../../shared/interfaces';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <button
      pButton
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [severity]="serverityMap()"
      [size]="sizeMap()"
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

  serverityMap(): 'success' | 'info' | 'danger' | 'secondary' | 'contrast' | undefined {
    const map: Record<ButtonVariant, 'success' | 'info' | 'danger' | 'secondary' | 'contrast' | undefined> = {
      primary: 'success',
      secondary: 'secondary',
      outline: 'info',
      icon: undefined,
    };
    return map[this.variant()];
  }

  sizeMap(): 'small' | 'large' | undefined {
    const map: Record<ButtonSize, 'small' | 'large' | undefined> = {
      sm: 'small',
      md: undefined,
      lg: 'large',
    };
    return map[this.size()];
  }
}
