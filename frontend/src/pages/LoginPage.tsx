import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
} from '@mui/icons-material'
import { authService } from '../services/authService'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authContext?.isLoggingOut) {
      authContext.setIsLoggingOut(false)
    }
    if (location.state?.error) {
      setError(location.state.error)
    }
  }, [location.state, authContext])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
    if (error) setError('')
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!formData.username || !formData.password) {
      setError('Por favor, completa todos los campos')
      return
    }

    setLoading(true)
    setError('')

    if (!authContext) {
      setError('Auth context no está disponible')
      setLoading(false)
      return
    }

    authService
      .login(formData.username, formData.password)
      .then(response => {
        authContext.setToken(response.data.token)
        navigate('/posts')
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Error en el servidor')
        } else {
          setError('Error de conexión o desconocido')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            position: 'relative',
            background: '#111111',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                mb: 1,
              }}
            >
              RedSocial
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inicia sesión en tu cuenta
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                border: '1px solid rgba(220, 53, 69, 0.2)',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Usuario"
              value={formData.username}
              onChange={handleInputChange('username')}
              margin="normal"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="filled"
              customSize="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Usuario: jane_doe | Contraseña: password123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage