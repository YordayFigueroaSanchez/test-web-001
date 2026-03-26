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
    expect(screen.getByRole('heading', { name: /features/i })).toBeTruthy();
  });

  it('should render all feature cards', async () => {
    await setup();
    expect(screen.getByText(/responsive design/i)).toBeTruthy();
    expect(screen.getByText(/accessibility first/i)).toBeTruthy();
    expect(screen.getByText('Dark Mode')).toBeTruthy();
    expect(screen.getByText(/blazing fast/i)).toBeTruthy();
    expect(screen.getByText(/multi-language/i)).toBeTruthy();
    expect(screen.getByText(/modern stack/i)).toBeTruthy();
  });

  it('should render the CTA section', async () => {
    await setup();
    expect(screen.getByText(/ready to get started/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /contact us/i })).toBeTruthy();
  });
});
