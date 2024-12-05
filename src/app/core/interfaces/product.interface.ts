import { Category } from './category.interface';
import { ProductTrade } from './product-trade.interface';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePurchase: number;
  stock: number;
  isActive: boolean;
  code: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  productTrades: ProductTrade[];
}

export interface CreateProduct {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  pricePurchase: number;
  isVariable: boolean;
  stock: number;
  code: string;
}

export interface UpdateProduct extends Partial<Omit<CreateProduct, 'stock'>> {}

export interface FilterProduct {
  textSearch: string;
  page: number;
  perPage: number;
}

export interface KardexFilter {
  productCode?: string;
  startDate: Date;
  endDate: Date;
}

export interface KardexResult {
  productCode: string;
  productName: string;
  salesCount: number;
  purchaseCount: number;
  totalStock: number;
}
