import { render, screen } from '@testing-library/angular';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  it('should render with default aria label', async () => {
    await render(SpinnerComponent);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('should render with custom aria label', async () => {
    await render(SpinnerComponent, { inputs: { ariaLabel: 'Processing' } });
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
  });

  it('should apply size classes for sm', async () => {
    await render(SpinnerComponent, { inputs: { size: 'sm' } });
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('h-4')).toBe(true);
  });

  it('should apply size classes for lg', async () => {
    await render(SpinnerComponent, { inputs: { size: 'lg' } });
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('h-12')).toBe(true);
  });
});
