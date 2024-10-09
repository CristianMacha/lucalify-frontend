import { Sale } from './sale.interface';

export interface Payment {
  id: string;
  amount: number;
  note: string;
  paymentDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  sale: Sale;
}

export interface CreatePaymentSale {
  amount: number;
  note: string;
  paymentDate: Date;
}
