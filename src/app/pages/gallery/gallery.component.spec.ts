import { render, screen, fireEvent } from '@testing-library/angular';
import { GalleryComponent } from './gallery.component';
import { provideRouter } from '@angular/router';

describe('GalleryComponent', () => {
  async function setup() {
    return render(GalleryComponent, {
      providers: [provideRouter([])],
    });
  }

  it('should render the gallery heading', async () => {
    await setup();
    expect(screen.getByRole('heading', { name: /gallery/i })).toBeTruthy();
  });

  it('should render gallery images', async () => {
    await setup();
    const buttons = screen.getAllByRole('listitem');
    expect(buttons.length).toBe(8);
  });

  it('should open lightbox when an image is clicked', async () => {
    await setup();
    const firstImage = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstImage);
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText(/1 \/ 8/)).toBeTruthy();
  });

  it('should close lightbox on close button click', async () => {
    await setup();
    fireEvent.click(screen.getAllByRole('listitem')[0]);
    expect(screen.getByRole('dialog')).toBeTruthy();

    fireEvent.click(screen.getByLabelText(/close lightbox/i));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should navigate images with keyboard arrows', async () => {
    await setup();
    fireEvent.click(screen.getAllByRole('listitem')[0]);
    const dialog = screen.getByRole('dialog');

    expect(screen.getByText(/1 \/ 8/)).toBeTruthy();
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(screen.getByText(/2 \/ 8/)).toBeTruthy();
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(screen.getByText(/1 \/ 8/)).toBeTruthy();
  });
});
