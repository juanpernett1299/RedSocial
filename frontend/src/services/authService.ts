const API_BASE_URL = 'http://localhost:3001'

export interface LoginResponse {
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al iniciar sesión')
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error de conexión')
    }
  }

  logout(): void {
    localStorage.removeItem('token')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      // Simple token validation - check if it's not expired
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }
}

export const authService = new AuthService()