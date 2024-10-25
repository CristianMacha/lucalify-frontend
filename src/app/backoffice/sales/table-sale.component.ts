import { DataSource } from '@angular/cdk/collections';
import { Component, inject } from '@angular/core';
import { Sale } from '@interfaces/sale.interface';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { selectFilteredSales } from './state/sale.selector';
import { CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-sale',
  standalone: true,
  imports: [CdkTableModule, CurrencyPipe, DatePipe],
  template: `
    <div class="table-container">
      <table cdk-table [dataSource]="dataSource" class="w-full">
        <ng-container cdkColumnDef="client">
          <th cdk-header-cell *cdkHeaderCellDef="">Id</th>
          <td cdk-cell *cdkCellDef="let sale">{{ sale.id }}</td>
        </ng-container>
        <ng-container cdkColumnDef="total">
          <th cdk-header-cell *cdkHeaderCellDef="">Total</th>
          <td cdk-cell *cdkCellDef="let sale">{{ sale.total | currency:'s/ ' }}</td>
        </ng-container>
        <ng-container cdkColumnDef="date">
          <th cdk-header-cell *cdkHeaderCellDef="">Fecha</th>
          <td cdk-cell *cdkCellDef="let sale">{{ sale.createdAt | date:'short' }}</td>
        </ng-container>
        <ng-container cdkColumnDef="user">
          <th cdk-header-cell *cdkHeaderCellDef="">Usuario</th>
          <td cdk-cell *cdkCellDef="let sale">{{ sale.createdBy }}</td>
        </ng-container>
        <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
        <tr
          cdk-row
          *cdkRowDef="let row; columns: displayedColumns; let i = index"
          [class.bg-tr]="i % 2 !== 0"
        ></tr>
      </table>
    </div>
  `,
})
export class TableSaleComponent {
  private store = inject(Store<AppState>);

  public displayedColumns: string[] = ['client', 'total', 'date', 'user'];
  public dataSource = new TableSaleDataSource();
  public sales$: Observable<Sale[]>;

  constructor() {
    this.sales$ = this.store.select(selectFilteredSales);
    this.sales$.subscribe((sales) => this.dataSource.data.next(sales));
  }
}

export class TableSaleDataSource extends DataSource<Sale> {
  data = new BehaviorSubject<Sale[]>([]);

  connect(): Observable<Sale[]> {
    return this.data;
  }

  disconnect() {}
}
