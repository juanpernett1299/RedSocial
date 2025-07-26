import axios, { type AxiosPromise } from 'axios';
import type { User } from '../types/user';

const API_BASE_URL = 'http://localhost:3003'; 

class UserService {
  getUserProfile(id: string, token: string): AxiosPromise<User> {
    return axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const userService = new UserService();
