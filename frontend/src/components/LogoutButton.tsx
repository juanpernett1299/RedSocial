import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { AuthContext } from '../context/AuthContext'

const LogoutButton = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    if (authContext) {
      authContext.setToken(null)
      navigate('/login')
    }
  }

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton 