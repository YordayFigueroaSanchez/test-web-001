import { render, screen } from '@testing-library/angular';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  it('should render label', async () => {
    await render(FormFieldComponent, {
      inputs: { label: 'Email', type: 'email' },
    });
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should show error message', async () => {
    await render(FormFieldComponent, {
      inputs: { label: 'Name', errorMessage: 'Name is required' },
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });

  it('should mark as required', async () => {
    await render(FormFieldComponent, {
      inputs: { label: 'Name', required: true },
    });
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-required', 'true');
  });

  it('should render textarea when type is textarea', async () => {
    await render(FormFieldComponent, {
      inputs: { label: 'Message', type: 'textarea' },
    });
    expect(screen.getByLabelText('Message').tagName).toBe('TEXTAREA');
  });
});
