import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white dark:bg-gray-950 dark:text-gray-50 dark:border-gray-600 px-4 border-b border-gray-100">
      <div class="py-7 md:py-10 wrapper flex flex-row gap-4 justify-between flex-wrap items-center">
        <h1 class="text-[32px] font-medium">{{title}}</h1>
        <ng-content select="[options]"></ng-content>
      </div>
    </div>
  `,
})
export class BreadcrumbsComponent {
  @Input() title: string = 'Breadcrumb';
}
