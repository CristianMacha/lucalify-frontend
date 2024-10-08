import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-sales-overview',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [title]="'Ventas'"> <router-outlet /> </app-breadcrumbs>
  `,
})
export class SalesOverviewComponent {}
