import { User } from './users.model';

export interface SignInBody {
  login: string;
  password: string;
}

export interface SignInResponseBody {
  token: string;
}

export interface SignUpBody extends SignInBody {
  name: string;
}

export type SignUpResponse = User;
