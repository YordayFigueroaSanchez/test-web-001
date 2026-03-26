import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update page title', () => {
    const titleService = TestBed.inject(Title);
    service.updateTitle('Test Page');
    expect(titleService.getTitle()).toBe('Test Page');
  });

  it('should set page SEO config', () => {
    const titleService = TestBed.inject(Title);
    service.setPageSeo({ title: 'About', description: 'About page' });
    expect(titleService.getTitle()).toBe('About');
  });
});
