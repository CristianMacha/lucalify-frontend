import { Component, inject, OnInit } from '@angular/core';
import { BackofficeService } from '../../backoffice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private backofficeService = inject(BackofficeService);
  private breakpointObserver = inject(BreakpointObserver);

  public isCollapse = false;
  public isMobile = false;
  public isMobileOpen = false;

  ngOnInit(): void {
    this.backofficeService.isCollapse().subscribe((isCollapse) => {
      this.isCollapse = isCollapse;
    });

    this.backofficeService.isMobile().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this.backofficeService.isMobileOpen().subscribe((isMobileOpen) => {
      this.isMobileOpen = isMobileOpen;
    });

    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        if (result.matches) {
          this.handleMinimize();
          this.backofficeService.isNoMobileSize();
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.matches) {
          this.backofficeService.isMobileSize();
        }
      });
  }

  public handleMinimize() {
    console.log('minimize');
    this.backofficeService.mininized();
  }

  public handleMaximize() {
    this.backofficeService.maximized();
  }

  public handleCloseMobile() {
    this.backofficeService.closeMobile();
  }
}
