import { style, animate, AnimationMetadata } from '@angular/animations';

export function fadeIn(duration = 200): AnimationMetadata[] {
  return [style({ opacity: 0 }), animate(`${duration}ms ease-out`, style({ opacity: 1 }))];
}

export function fadeOut(duration = 150): AnimationMetadata[] {
  return [animate(`${duration}ms ease-in`, style({ opacity: 0 }))];
}
