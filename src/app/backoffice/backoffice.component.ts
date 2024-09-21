import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BackofficeService } from './backoffice.service';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, NgClass],
  template: `
    <div class="flex flex-row">
      <app-sidenav />
      <div class="min-h-screen w-full">
        <div
          [ngClass]="{
            'ml-[250px]': !isMobile && !isCollapse,
            'ml-[80px]': !isMobile && isCollapse,
            'ml-0': isMobile,
          }"
        >
          <router-outlet />
          <button (click)="handleOpenMobile()">open</button>
        </div>
      </div>
    </div>
  `,
})
export class BackofficeComponent implements OnInit {
  private backofficeService = inject(BackofficeService);
  public isCollapse = false;
  public isMobile = false;

  ngOnInit(): void {
    this.backofficeService.isCollapse().subscribe((isCollapse) => {
      this.isCollapse = isCollapse;
    });

    this.backofficeService.isMobile().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  handleOpenMobile() {
    this.backofficeService.openMobile();
  }
}
