import { User } from './user.interface';

export interface SignIn {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}
