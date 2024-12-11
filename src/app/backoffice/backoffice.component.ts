import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthState } from '../auth/state/auth.reducer';
import { selectAccessAuth } from '../auth/state/auth.selector';
import { Access } from '@interfaces/access.interface';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
    RouterLinkActive,
    NgFor,
    AsyncPipe,
  ],
  template: `
    <!-- <div class="bg-white border-b border-gray-700">
    <button (click)="handleThemeChange('dark')">dark</button>
    <button (click)="handleThemeChange('light')">light</button>
  </div> -->
    <div
      class="flex border-b bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-700 sticky top-0 z-10 dark:text-gray-100 overflow-x-auto no-scrollbar"
    >
      @for (menu of menus$ | async; track menu.id) {
      <div class="flex h-[46px]">
        <a
          [routerLink]="[menu.path]"
          routerLinkActive="active-menu"
          [routerLinkActiveOptions]="{ exact: false }"
          class="px-6 border-b-2 border-transparent h-full flex items-center font-light dark:text-gray-200 whitespace-nowrap"
          >{{ menu.name }}</a
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
  private store = inject(Store<AuthState>);

  public menus$: Observable<Access[]> = this.store.select(selectAccessAuth);

  public handleThemeChange(theme: string): void {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
