import { User } from '@interfaces/user.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { authSetUser } from './auth.actions';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const _authReducer = createReducer(
  initialState,
  on(authSetUser, (state, user) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  }))
);
