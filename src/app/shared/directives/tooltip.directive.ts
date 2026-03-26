import { Directive, ElementRef, input, OnInit, OnDestroy, Renderer2, inject } from '@angular/core';
import { TooltipPosition } from '../interfaces';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  readonly appTooltip = input.required<string>();
  readonly tooltipPosition = input<TooltipPosition>('top');

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'aria-label', this.appTooltip());
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
