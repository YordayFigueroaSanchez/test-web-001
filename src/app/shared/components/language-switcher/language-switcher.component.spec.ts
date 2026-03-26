import { render, screen } from '@testing-library/angular';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
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
});
