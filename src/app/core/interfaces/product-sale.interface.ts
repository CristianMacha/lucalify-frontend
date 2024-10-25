import { Product } from './product.interface';
import { Sale } from './sale.interface';

export interface ProductSale {
  id: string;
  quantity: number;
  price: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  sale?: Sale;
}

export interface CreateProductSale {
  productId: string;
  quantity: number;
}

export interface CreateProductSaleFront {
  product: Product;
  quantity: number;
}
