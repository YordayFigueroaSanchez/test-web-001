import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { PageSeoConfig, OpenGraphData, MetaTag } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  updateTitle(pageTitle: string): void {
    this.title.setTitle(pageTitle);
  }

  updateMetaTags(tags: MetaTag[]): void {
    tags.forEach((tag) => {
      if (tag.name) {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      }
      if (tag.property) {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    });
  }

  updateOgTags(data: OpenGraphData): void {
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
    }
    if (data.type) {
      this.meta.updateTag({ property: 'og:type', content: data.type });
    }
    if (data.locale) {
      this.meta.updateTag({ property: 'og:locale', content: data.locale });
    }
  }

  setCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  private resolveCanonicalUrl(config: PageSeoConfig): string {
    if (config.canonicalUrl) {
      return config.canonicalUrl;
    }

    const win = this.document.defaultView;
    if (!win) {
      return '/';
    }

    if (config.route) {
      const normalizedRoute = config.route.startsWith('/') ? config.route : `/${config.route}`;
      return `${win.location.origin}${win.location.pathname}#${normalizedRoute}`;
    }

    return win.location.href;
  }

  setPageSeo(config: PageSeoConfig): void {
    const canonicalUrl = this.resolveCanonicalUrl(config);

    this.updateTitle(config.title);
    this.updateMetaTags([{ name: 'description', content: config.description }]);
    this.setCanonicalUrl(canonicalUrl);

    const ogData: OpenGraphData = {
      title: config.ogData?.title ?? config.title,
      description: config.ogData?.description ?? config.description,
      image: config.ogData?.image,
      url: config.ogData?.url ?? canonicalUrl,
      type: config.ogData?.type ?? 'website',
      locale: config.ogData?.locale ?? 'es_ES',
    };
    this.updateOgTags(ogData);

    if (config.additionalMeta) {
      this.updateMetaTags(config.additionalMeta);
    }
  }
}
