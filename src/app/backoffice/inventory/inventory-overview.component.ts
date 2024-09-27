import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-inventory-overview',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [title]="'Productos'">
      <div options class="flex justify-between flex-wrap gap-2">
        <div
          class="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-row gap-2 h-[40px]"
        >
          <a
            [routerLink]="['/products']"
            routerLinkActive="active-menu-breadcrumb"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center px-2 rounded-xl"
            >Productos</a
          >
          <a
            [routerLink]="['/products/categories']"
            routerLinkActive="active-menu-breadcrumb"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center px-2 rounded-xl"
            >Categorias</a
          >
          <a
            [routerLink]="['/products/packages']"
            routerLinkActive="active-menu-breadcrumb"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center px-2 rounded-xl"
            >Paquetes</a
          >
        </div>
      </div>
    </app-breadcrumbs>
    <router-outlet></router-outlet>
  `,
  styles: `
  .active {
    @apply bg-white dark:bg-gray-100 dark:text-gray-800 shadow-sm;
  }
`,
})
export class InventoryOverviewComponent {}
