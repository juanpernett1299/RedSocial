import axios, { type AxiosPromise } from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:3001';

class AuthService {
  login(username: string, password: string): AxiosPromise<LoginResponse> {
    const requestData: LoginRequest = { username, password };
    return axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, requestData);
  }
}

export const authService = new AuthService();
