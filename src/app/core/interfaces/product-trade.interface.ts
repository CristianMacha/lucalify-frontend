import { Product } from './product.interface';
import { Trade } from './trade.interface';

export interface ProductTrade {
  id: string;
  quantity: number;
  price: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  trade?: Trade;
}

export interface CreateProductTrade {
  productId: string;
  quantity: number;
}

export interface CreateProductTradeFront {
  product: Product;
  quantity: number;
  price: number;
}
