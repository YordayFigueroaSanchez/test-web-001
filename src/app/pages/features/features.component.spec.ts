import { render, screen } from '@testing-library/angular';
import { FeaturesComponent } from './features.component';
import { provideRouter } from '@angular/router';

describe('FeaturesComponent', () => {
  async function setup() {
    return render(FeaturesComponent, {
      providers: [provideRouter([])],
    });
  }

  it('should render the features heading', async () => {
    await setup();
    expect(screen.getByRole('heading', { name: /signature services for modern brands/i })).toBeTruthy();
  });

  it('should render all feature cards', async () => {
    await setup();
    expect(screen.getByText(/brand strategy/i)).toBeTruthy();
    expect(screen.getAllByText(/ux direction/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/design systems/i)).toBeTruthy();
    expect(screen.getByText(/frontend engineering/i)).toBeTruthy();
    expect(screen.getByText(/seo & content structure/i)).toBeTruthy();
    expect(screen.getByText(/optimization & growth/i)).toBeTruthy();
  });

  it('should render the CTA section', async () => {
    await setup();
    expect(screen.getByText(/ready to build your next digital chapter/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /schedule a strategy call/i })).toBeTruthy();
  });
});
