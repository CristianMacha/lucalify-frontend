import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { BackofficeService } from '../../backoffice.service';
import { AuthState } from '../../../auth/state/auth.reducer';
import { selectUserAuth } from '../../../auth/state/auth.selector';
import { User } from '@interfaces/user.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private router = inject(Router);
  private backofficeService = inject(BackofficeService);
  private breakpointObserver = inject(BreakpointObserver);
  private store = inject(Store<AppState>);

  public user$:Observable<User | null>;
  public isCollapse = false;
  public isMobile = false;
  public isMobileOpen = false;

  public menus = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'dashboard-icon',
      link: '/overview',
    },
    {
      id: 2,
      name: 'Productos',
      icon: 'products-icon',
      link: '/products',
    },
    {
      id: 3,
      name: 'Clientes',
      icon: 'client-icon',
      link: '/clients',
    },
  ];

  constructor() {
    this.user$ = this.store.select(selectUserAuth);
  }

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
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        if (result.matches) {
          this.handleMaximize();
          this.backofficeService.isNoMobileSize();
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          this.backofficeService.isNoMobileSize();
          this.handleMinimize();
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.matches) {
          this.handleMaximize();
          this.backofficeService.isMobileSize();
        }
      });
  }

  public handleMinimize() {
    this.backofficeService.mininized();
  }

  public handleMaximize() {
    this.backofficeService.maximized();
  }

  public handleCloseMobile() {
    this.backofficeService.closeMobile();
  }

  public getIconSrc(icon: string, link: string): string {
    const isActive = this.router.isActive(link, {
      paths: 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
    return isActive ? `assets/icons/${icon}-solid.svg` : `assets/icons/${icon}.svg`;
  }
}
