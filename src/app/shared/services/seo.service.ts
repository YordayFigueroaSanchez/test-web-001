import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PageSeoConfig, OpenGraphData, MetaTag } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

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

  setPageSeo(config: PageSeoConfig): void {
    this.updateTitle(config.title);
    this.updateMetaTags([{ name: 'description', content: config.description }]);

    if (config.ogData) {
      this.updateOgTags(config.ogData);
    }
    if (config.additionalMeta) {
      this.updateMetaTags(config.additionalMeta);
    }
  }
}
