import { SignIn } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const authLogin = createAction('[Auth Page] Login', props<SignIn>());
export const authSetUser = createAction('[Auth Page] Set User', props<User>());
export const authSetError = createAction('[Auth Page] Set Error', props<any>());
