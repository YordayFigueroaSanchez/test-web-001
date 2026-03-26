import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  const items = [
    { id: '1', title: 'Section 1', content: 'Content 1' },
    { id: '2', title: 'Section 2', content: 'Content 2' },
  ];

  it('should render all section headers', async () => {
    await render(AccordionComponent, { inputs: { items } });
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('should toggle content on click', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should have correct aria-expanded state', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button = screen.getByText('Section 1').closest('button')!;
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should collapse expanded section on second click', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button = screen.getByText('Section 1').closest('button')!;
    await user.click(button);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(button);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('should navigate with ArrowDown key', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button1 = screen.getByText('Section 1').closest('button')!;
    button1.focus();
    await user.keyboard('{ArrowDown}');
    const button2 = screen.getByText('Section 2').closest('button')!;
    expect(document.activeElement).toBe(button2);
  });

  it('should navigate with ArrowUp key', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button2 = screen.getByText('Section 2').closest('button')!;
    button2.focus();
    await user.keyboard('{ArrowUp}');
    const button1 = screen.getByText('Section 1').closest('button')!;
    expect(document.activeElement).toBe(button1);
  });

  it('should navigate to first with Home key', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button2 = screen.getByText('Section 2').closest('button')!;
    button2.focus();
    await user.keyboard('{Home}');
    const button1 = screen.getByText('Section 1').closest('button')!;
    expect(document.activeElement).toBe(button1);
  });

  it('should navigate to last with End key', async () => {
    const user = userEvent.setup();
    await render(AccordionComponent, { inputs: { items } });

    const button1 = screen.getByText('Section 1').closest('button')!;
    button1.focus();
    await user.keyboard('{End}');
    const button2 = screen.getByText('Section 2').closest('button')!;
    expect(document.activeElement).toBe(button2);
  });
});
