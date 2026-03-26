import { Injectable, signal, computed, OnDestroy, NgZone, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly scrollYValue = signal(0);
  private observers: IntersectionObserver[] = [];

  readonly scrollY = this.scrollYValue.asReadonly();
  readonly isScrolled = computed(() => this.scrollYValue() > 0);
  readonly showBackToTop = computed(() => this.scrollYValue() > 300);

  constructor() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  observeElement(
    element: Element,
    callback: (isVisible: boolean) => void,
    options?: IntersectionObserverInit,
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => callback(true));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      },
    );

    observer.observe(element);
    this.observers.push(observer);
    return observer;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    this.observers.forEach((o) => o.disconnect());
  }

  private onScroll = (): void => {
    this.ngZone.run(() => {
      this.scrollYValue.set(window.scrollY);
    });
  };
}
