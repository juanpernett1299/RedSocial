import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import PostsPage from '../pages/PostsPage'
import ProfilePage from '../pages/ProfilePage'
import Layout from '../components/Layout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="posts" element={<PostsPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes