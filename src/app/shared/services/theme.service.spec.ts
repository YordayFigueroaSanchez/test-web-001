import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light theme', () => {
    expect(service.currentTheme()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('should toggle to dark theme', () => {
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should persist theme in localStorage', () => {
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should restore from localStorage on init', () => {
    localStorage.setItem('theme', 'dark');
    service.initTheme();
    expect(service.currentTheme()).toBe('dark');
  });
});
