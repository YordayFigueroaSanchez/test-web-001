import { render, screen } from '@testing-library/angular';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('should render badge text', async () => {
    await render(BadgeComponent, { inputs: { text: 'New' } });
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should apply primary variant classes by default', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag' } });
    const badge = screen.getByText('Tag');
    expect(badge.className).toContain('bg-primary-100');
  });

  it('should apply secondary variant classes', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag', variant: 'secondary' } });
    const badge = screen.getByText('Tag');
    expect(badge.className).toContain('bg-secondary-100');
  });

  it('should apply accent variant classes', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag', variant: 'accent' } });
    const badge = screen.getByText('Tag');
    expect(badge.className).toContain('bg-accent-100');
  });
});
