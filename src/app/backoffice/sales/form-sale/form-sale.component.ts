import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs.component';
import { SearchProductComponent } from './search-product.component';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-form-sale',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterLink, SearchProductComponent],
  templateUrl: './form-sale.component.html',
})
export class FormSaleComponent {
  @Input() public id: string = 'Nueva venta';

  public productSubimitted(product: Product): void {
    console.log(product);
  }
}
