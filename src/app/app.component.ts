import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SkipNavComponent } from './shared/components/skip-nav/skip-nav.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SkipNavComponent, BackToTopComponent],
  template: `
    <app-skip-nav />
    <app-header />
    <main id="main-content" class="min-h-screen pt-16" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top />
    <div aria-live="polite" aria-atomic="true" class="sr-only" id="route-announcer"></div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `,
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
