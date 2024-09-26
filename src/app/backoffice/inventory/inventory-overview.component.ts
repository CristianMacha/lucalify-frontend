import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory-overview',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex border-b bg-white border-gray-200">
      <div class="flex h-[40px] md:h-[50px]">
        <a
          routerLink="/products"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          class="px-6 border-b-2 border-white h-full flex items-center"
          >Products</a
        >
      </div>
      <div class="flex h-[40px] md:h-[50px]">
        <a
          routerLink="/products/categories"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          class="px-6 border-b-2 border-white h-full flex items-center"
          >Categorias</a
        >
      </div>
    </div>
    <div class="p-4 md:p-6">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
  .active {
    @apply border-blue-500 font-medium;
  }
  `,
})
export class InventoryOverviewComponent {}
