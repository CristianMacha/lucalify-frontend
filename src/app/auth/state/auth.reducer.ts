import { User } from '@interfaces/user.interface';
import { createReducer, on } from '@ngrx/store';
import { authSetAccess, authSetUser } from './auth.actions';
import { Access } from '@interfaces/access.interface';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: any;
  access: Access[];
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  access: [],
  error: null,
};

export const _authReducer = createReducer(
  initialState,
  on(authSetUser, (state, user) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(authSetAccess, (state, { access }) => ({ ...state, access: [...access] }))
);
