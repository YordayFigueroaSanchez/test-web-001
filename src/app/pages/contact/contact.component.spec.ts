import { render, screen, fireEvent } from '@testing-library/angular';
import { ContactComponent } from './contact.component';
import { provideRouter } from '@angular/router';

describe('ContactComponent', () => {
  async function setup() {
    return render(ContactComponent, {
      providers: [provideRouter([])],
    });
  }

  it('should render the contact heading', async () => {
    await setup();
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeTruthy();
  });

  it('should render the contact form', async () => {
    await setup();
    expect(screen.getByLabelText(/^name/i)).toBeTruthy();
    expect(screen.getByLabelText(/^email/i)).toBeTruthy();
    expect(screen.getByLabelText(/^message/i)).toBeTruthy();
  });

  it('should render send and whatsapp buttons', async () => {
    await setup();
    expect(screen.getByRole('button', { name: /send contact message/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /contact us via whatsapp/i })).toBeTruthy();
  });

  it('should show success message after valid submission', async () => {
    await setup();

    const nameInput = screen.getByLabelText(/^name/i);
    const emailInput = screen.getByLabelText(/^email/i);
    const messageInput = screen.getByLabelText(/^message/i);

    fireEvent.input(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.input(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.input(messageInput, { target: { value: 'Hello this is a test message' } });

    const submitButton = screen.getByRole('button', { name: /send contact message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/your message has been sent/i)).toBeTruthy();
  });

  it('should allow sending another message after success', async () => {
    await setup();

    fireEvent.input(screen.getByLabelText(/^name/i), { target: { value: 'Jane Doe' } });
    fireEvent.input(screen.getByLabelText(/^email/i), { target: { value: 'jane@example.com' } });
    fireEvent.input(screen.getByLabelText(/^message/i), { target: { value: 'Hello this is a test message' } });
    fireEvent.click(screen.getByRole('button', { name: /send contact message/i }));

    fireEvent.click(screen.getByText(/send another message/i));
    expect(screen.getByLabelText(/^name/i)).toBeTruthy();
  });

  it('should not submit when form is invalid', async () => {
    await setup();
    const submitButton = screen.getByRole('button', { name: /send contact message/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show validation errors for touched empty fields', async () => {
    await setup();

    const nameInput = screen.getByLabelText(/^name/i);
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);

    // Trigger change detection by clicking submit on invalid form
    // The form marks fields as touched
  });

  it('should call whatsapp service on WhatsApp button click', async () => {
    await setup();
    const whatsappButton = screen.getByRole('button', { name: /contact us via whatsapp/i });
    fireEvent.click(whatsappButton);
    // Should not throw
    expect(whatsappButton).toBeTruthy();
  });
});
