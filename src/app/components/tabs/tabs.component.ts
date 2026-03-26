import { Component, input, signal, OnInit } from '@angular/core';
import { TabItem } from '../../shared/interfaces';

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `
    <div>
      <div role="tablist" [attr.aria-label]="ariaLabel()" class="flex border-b border-gray-200 dark:border-gray-700">
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
            class="px-4 py-3 text-sm font-medium transition-colors duration-200
                   focus-visible:outline-2 focus-visible:outline-primary-500"
            [class]="activeTabId() === tab.id
              ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
          >
            {{ tab.label }}
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
            class="p-4 text-gray-700 dark:text-gray-300"
          >
            {{ tab.content }}
          </div>
        }
      }
    </div>
  `,
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
