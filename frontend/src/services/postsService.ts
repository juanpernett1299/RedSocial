import axios, { type AxiosPromise } from 'axios';
import type { PostsApiResponse } from '../types/post';

const API_BASE_URL = 'http://localhost:3002'; 

class PostsService {
  getPosts(page: number, size: number, token: string): AxiosPromise<PostsApiResponse> {
    return axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        size
      }
    });
  }

  createPost(message: string, token: string): AxiosPromise<void> {
    return axios.post(
      `${API_BASE_URL}/posts`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  likePost(postId: number, token: string): AxiosPromise<void> {
    return axios.post(
      `${API_BASE_URL}/posts/${postId}/like`,
      {}, // No se necesita cuerpo en la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  unlikePost(postId: number, token: string): AxiosPromise<void> {
    return axios.delete(`${API_BASE_URL}/posts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const postsService = new PostsService();
