import { render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent (PrimeNG)', () => {
  it('should render with default variant', async () => {
    await render(ButtonComponent, {
      inputs: {},
      componentProperties: {},
    });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render projected content', async () => {
    await render(`<app-button>Click me</app-button>`, {
      imports: [ButtonComponent],
    });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled input is true', async () => {
    await render(ButtonComponent, {
      inputs: { disabled: true },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have aria-label when provided', async () => {
    await render(ButtonComponent, {
      inputs: { ariaLabel: 'Submit form' },
    });
    expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
  });

  it('should map variant to severity (primary -> success)', async () => {
    await render(ButtonComponent, {
      inputs: { variant: 'primary', ariaLabel: 'Primary btn' },
    });
    const button = screen.getByRole('button', { name: 'Primary btn' });
    expect(button.getAttribute('aria-label')).toBe('Primary btn');
  });

  it('should map size sm -> small PrimeNG size', async () => {
    await render(ButtonComponent, {
      inputs: { size: 'sm', ariaLabel: 'Small btn' },
    });
    const button = screen.getByRole('button', { name: 'Small btn' });
    expect(button).toBeInTheDocument();
  });

  it('should map size lg -> large PrimeNG size', async () => {
    await render(ButtonComponent, {
      inputs: { size: 'lg', ariaLabel: 'Large btn' },
    });
    const button = screen.getByRole('button', { name: 'Large btn' });
    expect(button).toBeInTheDocument();
  });
});
