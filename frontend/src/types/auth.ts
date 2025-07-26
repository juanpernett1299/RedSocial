import type { User } from './user';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
