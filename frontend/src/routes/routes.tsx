import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import PostsPage from '../pages/PostsPage'
import ProfilePage from '../pages/ProfilePage'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const AppRoutes = () => {
  const authContext = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/login" element={<LoginPage error={!authContext?.isAuthenticated ? 'Debes iniciar sesión para ver esta página.' : undefined} />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="posts" element={<PostsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/posts" replace />} />
    </Routes>
  )
}

export default AppRoutes