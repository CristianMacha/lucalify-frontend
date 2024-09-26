import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideState } from '@ngrx/store';
import { _authReducer, authFeatureKey } from './state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
    providers: [
      provideState({ name: authFeatureKey, reducer: _authReducer }),
      provideEffects(AuthEffects),
    ],
  },
];
