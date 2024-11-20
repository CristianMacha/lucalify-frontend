import { Client } from './client.interface';
import { CreatePaymentSale, Payment } from './payment.interface';
import { CreateProductSale, ProductSale } from './product-sale.interface';

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

export interface CreateSale {
  products: CreateProductSale[];
  clientId?: string;
  // payments: CreatePaymentSale[];
}
