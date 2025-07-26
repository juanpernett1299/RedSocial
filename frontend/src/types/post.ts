import type { User } from './user';

export interface Post {
  id: number;
  message: string;
  created_at: string;
  user: User;
  likedByCurrentUser: boolean;
  totalLikes: number;
}

export interface PostsApiResponse {
  elements: Post[];
  size: number;
  page: number;
  total: number;
}
