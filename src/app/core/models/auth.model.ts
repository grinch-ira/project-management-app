import { User } from './users.model';

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpRequest extends SignInRequest {
  name: string;
}

export type SignUpResponse = User;
