import { render, screen } from '@testing-library/angular';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  it('should render label', async () => {
    await render(
      `<app-form-field label="Email"><input type="email" /></app-form-field>`,
      { imports: [FormFieldComponent] },
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should show error message', async () => {
    await render(
      `<app-form-field label="Name" errorMessage="Name is required"><input type="text" /></app-form-field>`,
      { imports: [FormFieldComponent] },
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });

  it('should mark as required', async () => {
    await render(
      `<app-form-field label="Name" [required]="true"><input type="text" aria-required="true" /></app-form-field>`,
      { imports: [FormFieldComponent] },
    );
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-required', 'true');
  });

  it('should render textarea when projected', async () => {
    await render(
      `<app-form-field label="Message"><textarea></textarea></app-form-field>`,
      { imports: [FormFieldComponent] },
    );
    expect(screen.getByLabelText('Message').tagName).toBe('TEXTAREA');
  });
});
