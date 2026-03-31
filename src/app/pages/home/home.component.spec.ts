import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  it('should render hero heading', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('heading', { name: /design presence that speaks before you do/i })).toBeInTheDocument();
  });

  it('should render feature cards', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Editorial Direction')).toBeInTheDocument();
    expect(screen.getByText('Conversion Architecture')).toBeInTheDocument();
    expect(screen.getByText('Performance By Default')).toBeInTheDocument();
  });

  it('should render CTA section', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Ready To Elevate Your Brand Presence?')).toBeInTheDocument();
  });
});
