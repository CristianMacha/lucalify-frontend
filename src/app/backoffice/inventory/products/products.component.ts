import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TableProductComponent } from './table-product.component';
import { AppState } from '../../../app.state';
import {
  selectFilterProduct,
  selectPaginationProduct,
} from './state/product.selector';
import { loadProductsFiltered } from './state/product.actions';
import { PaginationComponent } from '../../../shared/pagination.component';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterProduct } from '@interfaces/product.interface';
import { FilterProductComponent } from './filter-product.component';
import { Dialog } from '@angular/cdk/dialog';
import { DialogPositionStrategy } from '@services/dialog-position-strategy.service';
import { ModalProductFormComponent } from './modal-product-form/modal-product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableProductComponent, PaginationComponent, FilterProductComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private store = inject(Store<AppState>);
  private dialog = inject(Dialog);
  private dialogPositionStrategy = inject(DialogPositionStrategy);

  private filterProduct!: FilterProduct;
  public pagination: PaginationInterface | null = null;

  ngOnInit(): void {
    this.store.select(selectFilterProduct).subscribe((filterProduct) => {
      this.store.dispatch(loadProductsFiltered({ filter: filterProduct }));
      this.filterProduct = filterProduct;
    });

    this.store.select(selectPaginationProduct).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  public handleOpenModal(): void {
    this.dialog.open<boolean>(ModalProductFormComponent, {
      width: '600px',
      positionStrategy: this.dialogPositionStrategy.centerTop(),
      disableClose: true,
    });
  }

  public handlePaginationChange(pagination: PaginationInterface): void {
    this.store.dispatch(
      loadProductsFiltered({
        filter: {
          ...this.filterProduct,
          page: pagination.currentPage,
          perPage: pagination.perPage,
        },
      })
    );
  }
}
