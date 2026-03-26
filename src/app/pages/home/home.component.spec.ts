import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  it('should render hero heading', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('heading', { name: /welcome to/i })).toBeInTheDocument();
  });

  it('should render feature cards', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Modern Design')).toBeInTheDocument();
    expect(screen.getByText('Fully Responsive')).toBeInTheDocument();
    expect(screen.getByText('Accessible')).toBeInTheDocument();
  });

  it('should render CTA section', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Ready to get started?')).toBeInTheDocument();
  });
});
