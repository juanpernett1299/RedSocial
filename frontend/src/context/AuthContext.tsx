import { createContext, useState, useEffect, type ReactNode, useMemo } from 'react'
import { userService } from '../services/userService'
import type { User } from '../types/user'

interface JwtPayload {
  id: number
  username: string
  alias: string
  exp: number
}

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  userInfo: User | null
  setToken: (token: string | null) => void
  isLoggingOut: boolean
  setIsLoggingOut: (value: boolean) => void
  logout: () => void
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (error) {
    console.error("Failed to decode token:", error)
    return null
  }
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false
  try {
    const payload = decodeToken(token)
    return payload ? payload.exp * 1000 > Date.now() : false
  } catch {
    return false
  }
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token')
    return isTokenValid(storedToken) ? storedToken : null
  })

  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      try {
        return JSON.parse(storedUserInfo)
      } catch {
        return null
      }
    }
    return null
  })

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      const payload = decodeToken(token)

      // Se llama al servicio de userService para obtener la información del usuario
      userService.getUserProfile(payload?.id?.toString() || '', token)
        .then(response => {
          const userData = response.data
          localStorage.setItem('userInfo', JSON.stringify(userData))
          setUserInfo(userData)
        })
        .catch(err => {
          console.error('Error getting user info:', err)
        })
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      setUserInfo(null)
    }
  }, [token])

  const logout = () => {
    setIsLoggingOut(true)
    setToken(null)
  }

  const isAuthenticated = useMemo(() => !!token, [token])

  const contextValue = {
    token,
    isAuthenticated,
    userInfo,
    setToken,
    isLoggingOut,
    setIsLoggingOut,
    logout,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
