import { render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
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
});
