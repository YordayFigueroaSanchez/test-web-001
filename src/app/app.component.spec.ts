import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('AppComponent', () => {
  async function setup() {
    return render(AppComponent, {
      providers: [provideRouter([]), provideAnimationsAsync()],
    });
  }

  it('should create the app', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the main content area', async () => {
    await setup();
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('should render skip navigation', async () => {
    await setup();
    expect(screen.getByText(/skip to main content/i)).toBeTruthy();
  });
});
