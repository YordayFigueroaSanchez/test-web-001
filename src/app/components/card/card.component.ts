import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CardVariant } from '../../shared/interfaces';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card>
      @if (imageSrc()) {
        <ng-template pTemplate="header">
          <img
            [src]="imageSrc()"
            [alt]="imageAlt()"
            [width]="640"
            [height]="360"
            class="w-full h-48 object-cover"
            loading="lazy"
          />
        </ng-template>
      }

      @if (title()) {
        <ng-template pTemplate="title">
          <h3 class="text-xl font-bold">{{ title() }}</h3>
        </ng-template>
      }

      @if (description()) {
        <ng-template pTemplate="subtitle">
          <p>{{ description() }}</p>
        </ng-template>
      }
      
      <ng-content />
    </p-card>
  `,
})
export class CardComponent {
  readonly variant = input<CardVariant>('feature');
  readonly imageSrc = input<string | undefined>(undefined);
  readonly imageAlt = input('');
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
}
