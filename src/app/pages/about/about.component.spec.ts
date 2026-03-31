import { render, screen } from '@testing-library/angular';
import { AboutComponent } from './about.component';
import { provideRouter } from '@angular/router';

describe('AboutComponent', () => {
  async function setup() {
    return render(AboutComponent, {
      providers: [provideRouter([])],
    });
  }

  it('should render the about heading', async () => {
    await setup();
    expect(screen.getByRole('heading', { name: /we build digital presence with precision/i })).toBeTruthy();
  });

  it('should render mission and vision sections', async () => {
    await setup();
    expect(screen.getByText(/our mission/i)).toBeTruthy();
    expect(screen.getByText(/our vision/i)).toBeTruthy();
  });

  it('should render team members', async () => {
    await setup();
    expect(screen.getByText(/elena marlowe/i)).toBeTruthy();
    expect(screen.getByText(/noah bennett/i)).toBeTruthy();
    expect(screen.getByText(/sofia laurent/i)).toBeTruthy();
  });
});
