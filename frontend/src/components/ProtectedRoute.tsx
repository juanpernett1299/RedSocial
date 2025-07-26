import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('ProtectedRoute must be used within an AuthProvider')
  }

  const { isAuthenticated, isLoggingOut } = authContext

  if (!isAuthenticated) {
    const state = isLoggingOut ? {} : { error: 'Debes iniciar sesión para ver esta página.' }
    return <Navigate to="/login" replace state={state} />
  }

  return <Outlet />
}

export default ProtectedRoute 