import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  it('should render navigation', async () => {
    await render(HeaderComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('should render logo link', async () => {
    await render(HeaderComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should have menu button for mobile', async () => {
    await render(HeaderComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
