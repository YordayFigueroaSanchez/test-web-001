import { render, screen } from '@testing-library/angular';
import { ModalComponent } from './modal.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ModalComponent (PrimeNG)', () => {
  it('should render p-dialog component when visible', async () => {
    await render(ModalComponent, {
      inputs: { isOpen: true, title: 'Test Modal' },
      providers: [provideNoopAnimations()],
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should display dialog header with title', async () => {
    await render(ModalComponent, {
      inputs: { isOpen: true, title: 'Test Modal' },
      providers: [provideNoopAnimations()],
    });
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('should project custom content into p-dialog body', async () => {
    await render(`<app-modal [isOpen]="true"><span class="custom-content">Custom Text</span></app-modal>`, {
      imports: [ModalComponent],
      providers: [provideNoopAnimations()],
    });
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });
});
