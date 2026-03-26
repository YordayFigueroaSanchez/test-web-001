import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should render toggle button', async () => {
    await render(ThemeToggleComponent);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    await render(ThemeToggleComponent);

    await user.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
