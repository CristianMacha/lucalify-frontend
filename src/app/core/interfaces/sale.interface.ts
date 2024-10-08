import { Client } from './client.interface';
import { Payment } from './payment.interface';
import { ProductSale } from './product-sale.interface';

export interface Sale {
  id: string;
  total: number;
  discount: number;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  payments: Payment[];
  productSales: ProductSale[];
}

export interface FilterSale {
  textSearch: string;
  page: number;
  perPage: number;
  fromDate?: Date;
  toDate?: Date;
}
