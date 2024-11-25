import { DataSource } from '@angular/cdk/collections';
import { Component, inject } from '@angular/core';
import { Trade } from '@interfaces/trade.interface';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { selectFilteredTrades } from './state/trade.selector';
import { CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-trade',
  standalone: true,
  imports: [CdkTableModule, CurrencyPipe, DatePipe],
  template: `
    <div class="table-container">
      <table cdk-table [dataSource]="dataSource" class="w-full">
        <ng-container cdkColumnDef="id">
          <th cdk-header-cell *cdkHeaderCellDef="">Id</th>
          <td cdk-cell *cdkCellDef="let trade">{{ trade.id }}</td>
        </ng-container>
        <ng-container cdkColumnDef="total">
          <th cdk-header-cell *cdkHeaderCellDef="">Total</th>
          <td cdk-cell *cdkCellDef="let trade">{{ trade.total | currency:'s/ ' }}</td>
        </ng-container>
        <ng-container cdkColumnDef="client">
          <th cdk-header-cell *cdkHeaderCellDef="">Cliente</th>
          <td cdk-cell *cdkCellDef="let trade">{{ trade.client?.name || '-' }}</td>
        </ng-container>
        <ng-container cdkColumnDef="date">
          <th cdk-header-cell *cdkHeaderCellDef="">Fecha</th>
          <td cdk-cell *cdkCellDef="let trade">{{ trade.createdAt | date:'short' }}</td>
        </ng-container>
        <ng-container cdkColumnDef="user">
          <th cdk-header-cell *cdkHeaderCellDef="">Usuario</th>
          <td cdk-cell *cdkCellDef="let trade">{{ trade.createdBy }}</td>
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
export class TableTradeComponent {
  private store = inject(Store<AppState>);

  public displayedColumns: string[] = ['id', 'total', 'client', 'date', 'user'];
  public dataSource = new TableTradeDataSource();
  public trades$: Observable<Trade[]>;

  constructor() {
    this.trades$ = this.store.select(selectFilteredTrades);
    this.trades$.subscribe((trades) => this.dataSource.data.next(trades));
  }
}

export class TableTradeDataSource extends DataSource<Trade> {
  data = new BehaviorSubject<Trade[]>([]);

  connect(): Observable<Trade[]> {
    return this.data;
  }

  disconnect() {}
}
