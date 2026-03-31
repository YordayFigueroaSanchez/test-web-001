import { Component, input, signal, OnInit } from '@angular/core';
import { TabItem } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-tabs p-tabs-scrollable">
      <div role="tablist" [attr.aria-label]="ariaLabel()" class="p-tabs-nav">
        @for (tab of tabs(); track tab.id; let i = $index) {
          <button
            type="button"
            role="tab"
            [id]="'tab-' + tab.id"
            [attr.aria-selected]="activeTabId() === tab.id"
            [attr.aria-controls]="'tabpanel-' + tab.id"
            [tabindex]="activeTabId() === tab.id ? 0 : -1"
            (click)="selectTab(tab.id)"
            (keydown)="onKeydown($event, i)"
            class="p-tab-header"
            [class.p-tab-header-active]="activeTabId() === tab.id"
          >
            <a href="javascript:void(0)" class="p-tab-header-link">
              {{ tab.label }}
            </a>
          </button>
        }
      </div>
      @for (tab of tabs(); track tab.id) {
        @if (activeTabId() === tab.id) {
          <div
            role="tabpanel"
            [id]="'tabpanel-' + tab.id"
            [attr.aria-labelledby]="'tab-' + tab.id"
            tabindex="0"
            class="p-tab-panel p-tab-panel-active"
          >
            {{ tab.content }}
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-tab-header {
        padding: var(--p-tab-header-padding, 0.75rem 1rem);
        border-bottom: 2px solid transparent;
        transition: all var(--p-transition-duration, 200ms);
      }

      .p-tab-header-active {
        border-bottom-color: var(--p-primary-color, #C9A84C);
        color: var(--p-primary-color, #C9A84C);
      }

      .p-tab-header:not(.p-tab-header-active) {
        color: var(--p-text-color-secondary);
        cursor: pointer;

        &:hover {
          color: var(--p-text-color);
        }
      }

      .p-tab-panel {
        padding: 1rem;
        display: none;
      }

      .p-tab-panel-active {
        display: block;
      }
    }
  `],
})
export class TabsComponent implements OnInit {
  readonly tabs = input<TabItem[]>([]);
  readonly ariaLabel = input('Tabs');
  readonly activeTabId = signal('');

  ngOnInit(): void {
    const first = this.tabs()[0];
    if (first && !this.activeTabId()) {
      this.activeTabId.set(first.id);
    }
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const tabList = this.tabs();
    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = (index + 1) % tabList.length;
        break;
      case 'ArrowLeft':
        targetIndex = (index - 1 + tabList.length) % tabList.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = tabList.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const targetTab = tabList[targetIndex];
    this.selectTab(targetTab.id);
    const el = document.getElementById('tab-' + targetTab.id);
    el?.focus();
  }
}
