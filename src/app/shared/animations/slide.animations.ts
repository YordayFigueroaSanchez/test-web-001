import { style, animate, AnimationMetadata } from '@angular/animations';

export function slideUp(duration = 300): AnimationMetadata[] {
  return [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(`${duration}ms ease-out`, style({ opacity: 1, transform: 'translateY(0)' })),
  ];
}

export function slideDown(duration = 200): AnimationMetadata[] {
  return [
    animate(
      `${duration}ms ease-in`,
      style({ opacity: 0, transform: 'translateY(20px)' }),
    ),
  ];
}

export function slideInRight(duration = 300): AnimationMetadata[] {
  return [
    style({ transform: 'translateX(100%)' }),
    animate(`${duration}ms ease-out`, style({ transform: 'translateX(0)' })),
  ];
}

export function slideOutRight(duration = 200): AnimationMetadata[] {
  return [
    animate(`${duration}ms ease-in`, style({ transform: 'translateX(100%)' })),
  ];
}
