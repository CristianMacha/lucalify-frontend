import { AuthState } from './auth/state/auth.reducer';
import { ClientState } from './backoffice/clients/state/client.reducer';
import { CategoryState } from './backoffice/inventory/categories/state/category.reducer';
import { ProductState } from './backoffice/inventory/products/state/product.reducer';
import { FormTradeState } from './backoffice/trades/form-trade/state/form-trade.reducer';
import { TradeState } from './backoffice/trades/state/trade.reducer';

export interface AppState {
  auth: AuthState;
  category: CategoryState;
  product: ProductState;
  client: ClientState;
  trade: TradeState;
  formTrade: FormTradeState;
}
