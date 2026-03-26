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
    expect(screen.getByRole('heading', { name: /about us/i })).toBeTruthy();
  });

  it('should render mission and vision sections', async () => {
    await setup();
    expect(screen.getByText(/our mission/i)).toBeTruthy();
    expect(screen.getByText(/our vision/i)).toBeTruthy();
  });

  it('should render team members', async () => {
    await setup();
    expect(screen.getByText(/jane doe/i)).toBeTruthy();
    expect(screen.getByText(/john smith/i)).toBeTruthy();
    expect(screen.getByText(/maria garcia/i)).toBeTruthy();
  });
});
