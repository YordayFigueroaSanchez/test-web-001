import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
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

  it('should update meta tags with name', () => {
    const meta = TestBed.inject(Meta);
    service.updateMetaTags([{ name: 'description', content: 'Test desc' }]);
    const tag = meta.getTag('name="description"');
    expect(tag?.getAttribute('content')).toBe('Test desc');
  });

  it('should update meta tags with property', () => {
    const meta = TestBed.inject(Meta);
    service.updateMetaTags([{ property: 'og:title', content: 'OG Title' }]);
    const tag = meta.getTag('property="og:title"');
    expect(tag?.getAttribute('content')).toBe('OG Title');
  });

  it('should update OG tags', () => {
    const meta = TestBed.inject(Meta);
    service.updateOgTags({
      title: 'My Site',
      description: 'A great site',
      image: 'https://example.com/img.png',
      url: 'https://example.com',
      type: 'website',
      locale: 'es_ES',
    });
    expect(meta.getTag('property="og:title"')?.getAttribute('content')).toBe('My Site');
    expect(meta.getTag('property="og:image"')?.getAttribute('content')).toBe('https://example.com/img.png');
    expect(meta.getTag('property="og:url"')?.getAttribute('content')).toBe('https://example.com');
    expect(meta.getTag('property="og:type"')?.getAttribute('content')).toBe('website');
    expect(meta.getTag('property="og:locale"')?.getAttribute('content')).toBe('es_ES');
  });

  it('should set page SEO with ogData and additionalMeta', () => {
    const titleService = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    service.setPageSeo({
      title: 'Full SEO',
      description: 'Full desc',
      ogData: { title: 'OG Full', description: 'OG Desc' },
      additionalMeta: [{ name: 'robots', content: 'index,follow' }],
    });
    expect(titleService.getTitle()).toBe('Full SEO');
    expect(meta.getTag('name="robots"')?.getAttribute('content')).toBe('index,follow');
  });
});
