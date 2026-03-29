import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { GalleryImage } from '../../shared/interfaces';

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <section aria-labelledby="gallery-heading">
        <h1
          id="gallery-heading"
          class="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center"
        >
          Gallery
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-12">
          Explore our portfolio of projects and creative work.
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
        >
          @for (image of images(); track image.id; let i = $index) {
            <button
              role="listitem"
              class="group relative overflow-hidden rounded-2xl aspect-square focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500"
              (click)="openLightbox(i)"
              [attr.aria-label]="'View ' + image.alt"
            >
              <picture>
                <source [srcset]="image.src" type="image/webp" />
                <img
                  [src]="getSvgFallback(image.src)"
                  [alt]="image.alt"
                  [attr.width]="image.width"
                  [attr.height]="image.height"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </picture>
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end"
                aria-hidden="true"
              >
                <span
                  class="text-white text-sm font-medium p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  {{ image.alt }}
                </span>
              </div>
            </button>
          }
        </div>
      </section>
    </div>

    @if (lightboxOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        tabindex="-1"
        (click)="closeLightbox()"
        (keydown)="onLightboxKeydown($event)"
      >
        <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
        <div class="relative max-w-5xl w-full mx-4" (click)="$event.stopPropagation()">
          <button
            class="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            (click)="closeLightbox()"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <button
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white text-4xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-2"
            (click)="previousImage()"
            aria-label="Previous image"
          >
            ‹
          </button>

          <picture>
            <source [srcset]="currentImage().src" type="image/webp" />
            <img
              [src]="getSvgFallback(currentImage().src)"
              [alt]="currentImage().alt"
              [attr.width]="currentImage().width"
              [attr.height]="currentImage().height"
              class="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </picture>

          <p class="text-white text-center mt-4 text-sm">
            {{ currentImage().alt }} — {{ selectedIndex() + 1 }} / {{ images().length }}
          </p>

          <button
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white text-4xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-2"
            (click)="nextImage()"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    }
  `,
})
export class GalleryComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly images = signal<GalleryImage[]>([
    { id: '1', src: 'assets/images/gallery/project-01.webp', alt: 'Project Alpha - Modern web application', width: 1200, height: 1200 },
    { id: '2', src: 'assets/images/gallery/project-02.webp', alt: 'Project Beta - E-commerce platform', width: 1200, height: 1200 },
    { id: '3', src: 'assets/images/gallery/project-03.webp', alt: 'Project Gamma - Dashboard design', width: 1200, height: 1200 },
    { id: '4', src: 'assets/images/gallery/project-04.webp', alt: 'Project Delta - Mobile application', width: 1200, height: 1200 },
    { id: '5', src: 'assets/images/gallery/project-05.webp', alt: 'Project Epsilon - Brand identity', width: 1200, height: 1200 },
    { id: '6', src: 'assets/images/gallery/project-06.webp', alt: 'Project Zeta - Marketing site', width: 1200, height: 1200 },
    { id: '7', src: 'assets/images/gallery/project-07.webp', alt: 'Project Eta - SaaS platform', width: 1200, height: 1200 },
    { id: '8', src: 'assets/images/gallery/project-08.webp', alt: 'Project Theta - Portfolio site', width: 1200, height: 1200 },
  ]);

  readonly lightboxOpen = signal(false);
  readonly selectedIndex = signal(0);
  readonly currentImage = computed(() => this.images()[this.selectedIndex()]);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Gallery — test-web-001',
      description: 'Browse our portfolio of projects and creative work.',
    });
  }

  openLightbox(index: number): void {
    this.selectedIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  nextImage(): void {
    const next = (this.selectedIndex() + 1) % this.images().length;
    this.selectedIndex.set(next);
  }

  previousImage(): void {
    const prev = (this.selectedIndex() - 1 + this.images().length) % this.images().length;
    this.selectedIndex.set(prev);
  }

  onLightboxKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'Escape':
        this.closeLightbox();
        break;
    }
  }

  getSvgFallback(src: string): string {
    return src.endsWith('.webp') ? src.replace(/\.webp$/i, '.svg') : src;
  }
}
