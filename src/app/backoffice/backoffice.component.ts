import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink, RouterLinkActive, NgFor],
  template: `
  <div class="bg-white border-b border-gray-700">
    <button (click)="handleThemeChange('dark')">dark</button>
    <button (click)="handleThemeChange('light')">light</button>
  </div>
    <div class="flex border-b bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-700 sticky top-0 z-10 dark:text-gray-100 overflow-x-auto no-scrollbar">
      @for (menu of menus; track menu.id) {
      <div class="flex h-[46px]">
        <a
          [routerLink]="[menu.link]"
          routerLinkActive="active-menu"
          [routerLinkActiveOptions]="{ exact: false }"
          class="px-6 border-b-2 border-transparent h-full flex items-center font-light dark:text-gray-200 whitespace-nowrap"
          >{{menu.name}}</a
        >
      </div>
      }
    </div>
    <div class="min-h-screen">
      <router-outlet />
    </div>
  `,
})
export class BackofficeComponent {
  public menus = [
    { id: 1, name: 'Descripción general', link: '/overview' },
    { id: 2, name: 'Productos', link: '/products' },
    { id: 3, name: 'Clientes', link: '/clients' },
    { id: 4, name: 'Ventas', link: '/sales' },
    { id: 5, name: 'Compras', link: '/purchases' },
  ];

  public handleThemeChange(theme: string): void {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
