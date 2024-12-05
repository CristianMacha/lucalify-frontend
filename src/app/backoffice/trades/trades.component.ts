import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

import { AppState } from '../../app.state';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { TableTradeComponent } from './table-trade.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';
import {
  selectFilterTrade,
  selectPaginationTrade,
} from './state/trade.selector';
import { FilterTrade, TradeType } from '@interfaces/trade.interface';
import { loadFilteredTrade } from './state/trade.actions';
import { TradesService } from './trades.service';
import { Dialog } from '@angular/cdk/dialog';
import { ReportTradeComponent } from './report-trade/report-trade.component';

@Component({
  selector: 'app-trades-overview',
  standalone: true,
  imports: [
    TableTradeComponent,
    PaginationComponent,
    NgIf,
    BreadcrumbsComponent,
    RouterLink,
  ],
  templateUrl: './trades.component.html',
})
export class TradesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private tradesService = inject(TradesService);
  private dialog = inject(Dialog);

  private filterTrade!: FilterTrade;
  public pagination: PaginationInterface | null = null;
  public tradeType: TradeType = TradeType.SALE;
  public tradeUrl = '';

  ngOnInit(): void {
    this.setTradeType();

    this.store.select(selectPaginationTrade).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  private setTradeType(): void {
    this.tradeUrl = this.tradesService.getTradeType().title;
    this.tradeType = this.tradesService.getTradeType().tradeType;
    this.getTrades();
  }

  private getTrades(): void {
    this.store.select(selectFilterTrade).subscribe((filterTrade) => {
      this.store.dispatch(loadFilteredTrade({ filter: {...filterTrade, type: this.tradeType} }));
      this.filterTrade = filterTrade;
    });
  }

  public handlePaginationChange(pagination: PaginationInterface): void {
    this.store.dispatch(
      loadFilteredTrade({
        filter: {
          ...this.filterTrade,
          page: pagination.currentPage,
          perPage: pagination.perPage,
          type: this.tradeType,
        },
      })
    );
  }

  public openReport(): void {
    this.dialog.open(ReportTradeComponent, {
      width: '400px',
    })
  }
}
