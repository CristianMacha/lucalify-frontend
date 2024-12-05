import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './reports.component.html',
  styles: ``,
})
export class ReportsComponent {}
