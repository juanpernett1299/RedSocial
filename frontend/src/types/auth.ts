export interface User {
  id: number
  username: string
  alias: string
  first_name: string
  last_name: string
  birth_date: string
  created_at: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}