import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-inventory-overview',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Inventario</h1>
    <router-outlet></router-outlet>
  `,
})
export class InventoryOverviewComponent {}
