import { Category } from './category.interface';
import { ProductSale } from './product-sale.interface';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  code: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  productSales: ProductSale[];
}

export interface CreateProduct {
  name: string;
  description: string;
  categoryId: string;
  price: number;
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
