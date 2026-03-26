import { render, screen } from '@testing-library/angular';
import { BackToTopComponent } from './back-to-top.component';

describe('BackToTopComponent', () => {
  it('should not render when scroll is at top', async () => {
    await render(BackToTopComponent);
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
  });
});
