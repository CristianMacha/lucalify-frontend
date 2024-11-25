import { Trade } from './trade.interface';

export interface Payment {
  id: string;
  amount: number;
  note: string;
  paymentDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  trade: Trade;
}

export interface CreatePaymentTrade {
  id: string;
  amount: number;
  note: string;
  paymentDate: Date;
}
