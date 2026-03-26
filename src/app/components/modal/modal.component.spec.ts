import { render, screen } from '@testing-library/angular';
import { ModalComponent } from './modal.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  it('should not render when closed', async () => {
    await render(ModalComponent, {
      inputs: { isOpen: false, title: 'Test Modal' },
      providers: [provideNoopAnimations()],
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when open', async () => {
    await render(ModalComponent, {
      inputs: { isOpen: true, title: 'Test Modal' },
      providers: [provideNoopAnimations()],
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('should have close button with aria-label', async () => {
    await render(ModalComponent, {
      inputs: { isOpen: true, title: 'Test' },
      providers: [provideNoopAnimations()],
    });
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
  });
});
