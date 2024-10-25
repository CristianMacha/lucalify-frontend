import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs.component';
import { SearchProductComponent } from './search-product.component';
import { Product } from '@interfaces/product.interface';
import { ListProductSaleComponent } from './list-product-sale.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { addProductSale } from './state/form-sale.actions';

@Component({
  selector: 'app-form-sale',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    SearchProductComponent,
    ListProductSaleComponent,
  ],
  templateUrl: './form-sale.component.html',
})
export class FormSaleComponent {
  private store = inject(Store<AppState>);
  @Input() public id: string = 'Nueva venta';

  public productSubimitted(product: Product): void {
    this.store.dispatch(
      addProductSale({product})
    );
  }
}
