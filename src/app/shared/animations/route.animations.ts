import {
  trigger,
  transition,
  style,
  animate,
  query,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const routeAnimation: AnimationTriggerMetadata = trigger('routeAnimation', [
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
