import { Access } from './access.interface';
import { User } from './user.interface';

export interface SignIn {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface AuthMeResponse {
  user: User;
  access: Access[];
}
