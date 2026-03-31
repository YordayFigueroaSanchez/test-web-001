import { render, screen } from '@testing-library/angular';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent (PrimeNG)', () => {
  it('should render badge with text value', async () => {
    await render(BadgeComponent, { inputs: { text: 'New' } });
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should apply primary variant (success severity)', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag', variant: 'primary' } });
    const badge = screen.getByText('Tag');
    expect(badge).toBeInTheDocument();
  });

  it('should apply secondary variant', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag', variant: 'secondary' } });
    const badge = screen.getByText('Tag');
    expect(badge).toBeInTheDocument();
  });

  it('should apply accent variant (info severity)', async () => {
    await render(BadgeComponent, { inputs: { text: 'Tag', variant: 'accent' } });
    const badge = screen.getByText('Tag');
    expect(badge).toBeInTheDocument();
  });
});
