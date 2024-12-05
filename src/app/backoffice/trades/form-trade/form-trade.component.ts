import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs.component';
import { SearchProductComponent } from './search-product.component';
import { Product } from '@interfaces/product.interface';
import { ListProductTradeComponent } from './list-product-trade.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {
  addProductTrade,
  clearFormTrade,
  setFormTrade,
} from './state/form-trade.actions';
import { ClientSelectionComponent } from './client-selection/client-selection.component';
import { Client } from '@interfaces/client.interface';
import {
  selectFormTradeClient,
  selectFormTradeProducts,
} from './state/form-trade.selector';
import { ProductTrade } from '@interfaces/product-trade.interface';
import { NgIf } from '@angular/common';
import { CreateTrade, TradeType } from '@interfaces/trade.interface';
import { TradeService } from '@services/trade.service';
import { TradesService } from '../trades.service';

@Component({
  selector: 'app-form-trade',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    SearchProductComponent,
    ListProductTradeComponent,
    ClientSelectionComponent,
    NgIf,
  ],
  templateUrl: './form-trade.component.html',
})
export class FormTradeComponent implements OnInit {
  @Input() id!: string;
  private store = inject(Store<AppState>);
  private tradeService = inject(TradeService);
  private tradesService = inject(TradesService);
  private router = inject(Router);

  public tradeType: TradeType = TradeType.SALE;
  public tradeTypeTitle: string = 'ventas';
  public productTradesSelected: ProductTrade[] = [];
  public clientSelected: Client | null = null;
  public editMode: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(clearFormTrade());
    this.tradeType = this.tradesService.getTradeType().tradeType;
    this.tradeTypeTitle = this.tradesService.getTradeType().title;
    this.getProductsSelected();
    this.getClientSelected();
    this.setEditMode();
  }

  private getProductsSelected(): void {
    this.store.select(selectFormTradeProducts).subscribe((productTrades) => {
      this.productTradesSelected = productTrades;
    });
  }

  private getClientSelected(): void {
    this.store.select(selectFormTradeClient).subscribe((client) => {
      this.clientSelected = client;
    });
  }

  private createTrade(createTrade: CreateTrade): void {
    this.tradeService.create(createTrade).subscribe({
      next: (trade) => {
        this.store.dispatch(clearFormTrade());
        this.router.navigate([this.tradeType + 's', 'add-edit', trade.id]);
        this.id = trade.id;
        this.editMode = true;
        this.getTrade();
      },
    });
  }

  private setEditMode(): void {
    const id = this.id;
    if (id !== 'new') {
      this.editMode = true;
      this.getTrade();
    }
  }

  private getTrade(): void {
    this.tradeService.getById(this.id).subscribe({
      next: (trade) => this.store.dispatch(setFormTrade({ trade })),
    });
  }

  public productSubimitted(product: Product): void {
    this.store.dispatch(
      addProductTrade({ product, tradeType: this.tradeType })
    );
  }

  public handleCreateTrade(): void {
    const createTrade: CreateTrade = {
      productTrades: this.productTradesSelected.map((productTrade) => ({
        productId: productTrade.product.id,
        quantity: productTrade.quantity,
        price: productTrade.price,
      })),
      clientId: this.clientSelected?.id,
      type: this.tradeType,
    };
    this.createTrade(createTrade);
  }

  public getTicket(): void {
    this.tradeService.getTicket(this.id).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
    });
  }
}
