import { render } from '@testing-library/angular';
import { TooltipDirective } from './tooltip.directive';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `<button [appTooltip]="'Help text'">Hover me</button>`,
})
class TestHostComponent {}

describe('TooltipDirective', () => {
  it('should set aria-label on host element', async () => {
    const { container } = await render(TestHostComponent);
    const button = container.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Help text');
  });
});
