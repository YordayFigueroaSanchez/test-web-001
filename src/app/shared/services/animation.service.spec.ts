import { TestBed } from '@angular/core/testing';
import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have routeTransition defined', () => {
    expect(service.routeTransition).toBeDefined();
  });

  it('should detect prefers-reduced-motion', () => {
    expect(typeof service.prefersReducedMotion()).toBe('boolean');
  });
});
