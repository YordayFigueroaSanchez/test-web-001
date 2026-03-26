import { Injectable, signal } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  AnimationTriggerMetadata,
} from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  readonly prefersReducedMotion = signal(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  readonly routeTransition: AnimationTriggerMetadata = trigger('routeAnimation', [
    transition('* <=> *', [
      query(
        ':enter',
        [style({ opacity: 0, position: 'absolute', width: '100%' })],
        { optional: true },
      ),
      query(':leave', [animate('150ms ease-in', style({ opacity: 0 }))], {
        optional: true,
      }),
      query(':enter', [animate('200ms ease-out', style({ opacity: 1 }))], {
        optional: true,
      }),
    ]),
  ]);
}
