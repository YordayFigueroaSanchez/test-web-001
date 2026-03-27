import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  afterEach(() => {
    service.ngOnDestroy();
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

  it('should call scrollTo on scrollToTop', () => {
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    service.scrollToTop();
    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    spy.mockRestore();
  });

  it('should observe element and call callback when intersecting', (done) => {
    const mockTarget = document.createElement('div');
    const mockObserver = { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
    let capturedCb: ((entries: { isIntersecting: boolean; target: Element }[]) => void) | null = null;
    const origIO = (window as Record<string, unknown>)['IntersectionObserver'];
    (window as Record<string, unknown>)['IntersectionObserver'] = jest.fn((cb: typeof capturedCb) => {
      capturedCb = cb;
      return mockObserver;
    });

    const callback = jest.fn();
    service.observeElement(mockTarget, callback);

    // Invoke after constructor returns so `observer` const is assigned
    capturedCb!([{ isIntersecting: true, target: mockTarget }]);

    expect(callback).toHaveBeenCalledWith(true);
    expect(mockObserver.unobserve).toHaveBeenCalledWith(mockTarget);

    (window as Record<string, unknown>)['IntersectionObserver'] = origIO;
    done();
  });

  it('should clean up on destroy', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    service.ngOnDestroy();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});
