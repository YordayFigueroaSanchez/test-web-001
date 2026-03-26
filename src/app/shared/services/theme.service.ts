import { Injectable, signal, computed } from '@angular/core';
import { ThemeMode } from '../interfaces';

const THEME_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly theme = signal<ThemeMode>('light');

  readonly currentTheme = this.theme.asReadonly();
  readonly isDark = computed(() => this.theme() === 'dark');

  initTheme(): void {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (stored === 'dark' || stored === 'light') {
      this.applyTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(prefersDark ? 'dark' : 'light');
  }

  toggleTheme(): void {
    const next: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  private applyTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
