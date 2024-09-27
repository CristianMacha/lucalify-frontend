import { AuthState } from './auth/state/auth.reducer';
import { ClientState } from './backoffice/clients/state/client.reducer';
import { CategoryState } from './backoffice/inventory/categories/state/category.reducer';
import { ProductState } from './backoffice/inventory/products/state/product.reducer';

export interface AppState {
  auth: AuthState;
  category: CategoryState;
  product: ProductState;
  client: ClientState;
}
