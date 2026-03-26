import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  const tabs = [
    { id: 'a', label: 'Tab A', content: 'Content A' },
    { id: 'b', label: 'Tab B', content: 'Content B' },
  ];

  it('should render all tab buttons', async () => {
    await render(TabsComponent, { inputs: { tabs } });
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument();
  });

  it('should show first tab content by default', async () => {
    await render(TabsComponent, { inputs: { tabs } });
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A');
  });

  it('should switch content on tab click', async () => {
    const user = userEvent.setup();
    await render(TabsComponent, { inputs: { tabs } });

    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B');
  });

  it('should mark selected tab with aria-selected', async () => {
    await render(TabsComponent, { inputs: { tabs } });
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'false');
  });

  it('should navigate tabs with ArrowRight key', async () => {
    const user = userEvent.setup();
    await render(TabsComponent, { inputs: { tabs } });

    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B');
  });

  it('should navigate tabs with ArrowLeft key (wrap)', async () => {
    const user = userEvent.setup();
    await render(TabsComponent, { inputs: { tabs } });

    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B');
  });

  it('should navigate to first tab with Home key', async () => {
    const user = userEvent.setup();
    await render(TabsComponent, { inputs: { tabs } });

    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    const tabB = screen.getByRole('tab', { name: 'Tab B' });
    tabB.focus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A');
  });

  it('should navigate to last tab with End key', async () => {
    const user = userEvent.setup();
    await render(TabsComponent, { inputs: { tabs } });

    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B');
  });
});
