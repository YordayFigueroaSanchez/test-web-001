import { Component, input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [BadgeModule],
  template: `
    <span
      pBadge
      [value]="text()"
      [severity]="severityMap()"
    ></span>
  `,
})
export class BadgeComponent {
  readonly text = input.required<string>();
  readonly variant = input<'primary' | 'secondary' | 'accent'>('primary');

  severityMap(): 'success' | 'secondary' | 'info' {
    const map = {
      primary: 'success' as const,
      secondary: 'secondary' as const,
      accent: 'info' as const,
    };
    return map[this.variant()];
  }
}
