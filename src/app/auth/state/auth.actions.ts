import { Access } from '@interfaces/access.interface';
import { SignIn } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const authLogin = createAction('[Auth Page] Login', props<SignIn>());
export const authSetUser = createAction('[Auth Page] Set User', props<User>());
export const authSetError = createAction('[Auth Page] Set Error', props<any>());

export const authSetAccess = createAction('[Auth Page] Set Access', props<{ access: Access[] }>());
