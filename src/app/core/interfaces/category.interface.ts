import { Product } from './product.interface';

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export interface CreateCategory {
  name: string;
  description: string;
}

export interface UpdateCategory {
  name: string;
  description: string;
  active: boolean;
}

export interface FilterCategory {
  textSearch: string;
  page: number;
  perPage: number;
}
