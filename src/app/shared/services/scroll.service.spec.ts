import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default scrollY to 0', () => {
    expect(service.scrollY()).toBe(0);
  });

  it('should default showBackToTop to false', () => {
    expect(service.showBackToTop()).toBe(false);
  });

  it('should default isScrolled to false', () => {
    expect(service.isScrolled()).toBe(false);
  });
});
