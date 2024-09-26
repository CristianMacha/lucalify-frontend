import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AppState } from '../../app.state';

export const selectUser = (state: AppState) => state.auth;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;

export const selectUserAuth = createSelector(selectUser, (state) => state.user);
