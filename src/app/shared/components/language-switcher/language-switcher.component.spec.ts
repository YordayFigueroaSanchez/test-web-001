import { render, screen } from '@testing-library/angular';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  afterEach(() => {
    history.replaceState({}, '', '/');
  });

  it('should show EN when current locale is es', async () => {
    await render(LanguageSwitcherComponent, {
      inputs: { currentLocale: 'es' },
    });
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('should show ES when current locale is en', async () => {
    await render(LanguageSwitcherComponent, {
      inputs: { currentLocale: 'en' },
    });
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('should have correct aria-label', async () => {
    await render(LanguageSwitcherComponent, {
      inputs: { currentLocale: 'es' },
    });
    expect(screen.getByRole('link', { name: 'Switch to English' })).toBeInTheDocument();
  });

  it('should preserve repository subpath and current hash route when switching locale', async () => {
    history.replaceState({}, '', '/test-web-001/#/contact');

    await render(LanguageSwitcherComponent, {
      inputs: { currentLocale: 'es' },
    });

    const languageLink = screen.getByRole('link', { name: 'Switch to English' });
    expect(languageLink).toHaveAttribute('href', '/test-web-001/en/#/contact');
  });
});
