import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs.component';
import { SearchProductComponent } from './search-product.component';
import { Product } from '@interfaces/product.interface';
import { ListProductSaleComponent } from './list-product-sale.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { addProductSale, clearFormSale } from './state/form-sale.actions';
import { ClientSelectionComponent } from './client-selection/client-selection.component';
import { Client } from '@interfaces/client.interface';
import {
  selectFormSaleClient,
  selectFormSaleProducts,
} from './state/form-sale.selector';
import { ProductSale } from '@interfaces/product-sale.interface';
import { NgIf } from '@angular/common';
import { CreateSale } from '@interfaces/sale.interface';
import { SaleService } from '@services/sale.service';

@Component({
  selector: 'app-form-sale',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    SearchProductComponent,
    ListProductSaleComponent,
    ClientSelectionComponent,
    NgIf,
  ],
  templateUrl: './form-sale.component.html',
})
export class FormSaleComponent implements OnInit {
  @Input() public id: string = 'Nueva venta';
  private store = inject(Store<AppState>);
  private saleService = inject(SaleService);
  private router = inject(Router);

  public productsSelected: ProductSale[] = [];
  public clientSelected: Client | null = null;

  public productSubimitted(product: Product): void {
    this.store.dispatch(addProductSale({ product }));
  }

  ngOnInit(): void {
    this.getProductsSelected();
    this.getClientSelected();
  }

  private getProductsSelected(): void {
    this.store.select(selectFormSaleProducts).subscribe((products) => {
      this.productsSelected = products;
    });
  }

  private getClientSelected(): void {
    this.store.select(selectFormSaleClient).subscribe((client) => {
      this.clientSelected = client;
    });
  }

  private createSale(createSale: CreateSale): void {
    this.saleService.create(createSale).subscribe({
      next: () => {
        this.store.dispatch(clearFormSale());
        this.router.navigate(['/sales']);
      },
    });
  }

  public handleCreateSale(): void {
    const createSale: CreateSale = {
      products: this.productsSelected.map((productSale) => ({
        productId: productSale.product.id,
        quantity: productSale.quantity,
      })),
      clientId: this.clientSelected?.id,
    };
    this.createSale(createSale);
  }
}
