import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-trades-overview',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: ` <router-outlet /> `,
})
export class TradesOverviewComponent {}
