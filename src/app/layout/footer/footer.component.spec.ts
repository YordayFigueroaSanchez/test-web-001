import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';

describe('FooterComponent', () => {
  it('should render footer navigation', async () => {
    await render(FooterComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument();
  });

  it('should render copyright', async () => {
    await render(FooterComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
