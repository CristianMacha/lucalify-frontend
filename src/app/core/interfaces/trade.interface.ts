import { Client } from './client.interface';
import { CreatePaymentTrade, Payment } from './payment.interface';
import { CreateProductTrade, ProductTrade } from './product-trade.interface';

export enum TradeType {
  SALE = 'sale',
  PURCHASE = 'purchase',
}

export interface Trade {
  id: string;
  total: number;
  discount: number;
  rounding: number;
  type: TradeType;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  payments: Payment[];
  productTrades: ProductTrade[];
}

export interface FilterTrade {
  textSearch: string;
  page: number;
  perPage: number;
  fromDate?: Date;
  toDate?: Date;
  type: TradeType;
}

export interface CreateTrade {
  products: CreateProductTrade[];
  clientId?: string;
  type: TradeType;
  // payments: CreatePaymentTrade[];
}
