import { render, screen } from '@testing-library/angular';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent (PrimeNG)', () => {
  it('should render with default aria label', async () => {
    await render(SpinnerComponent);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('should render with custom aria label', async () => {
    await render(SpinnerComponent, { inputs: { ariaLabel: 'Processing' } });
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
  });

  it('should render p-progressSpinner component', async () => {
    await render(SpinnerComponent);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    // p-progressSpinner creates SVG internally
    const svg = status.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply size small', async () => {
    await render(SpinnerComponent, { inputs: { size: 'sm' } });
    const spinner = screen.getByRole('status').querySelector('p-progressspinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should apply size large', async () => {
    await render(SpinnerComponent, { inputs: { size: 'lg' } });
    const spinner = screen.getByRole('status').querySelector('p-progressspinner');
    expect(spinner).toBeInTheDocument();
  });
});
