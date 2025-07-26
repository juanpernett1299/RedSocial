import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  birth_date: string
  alias: string
  created_at: string
}

const ProfileHeader = styled(Paper)(({ theme }) => ({
  background: '#111111',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: '40px',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
  },
}))

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
}))

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.875rem',
  fontWeight: 500,
  minWidth: '120px',
}))

const InfoValue = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 400,
}))

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // TODO: Conectar con el servicio de usuarios /users/:id
    const mockUser: User = {
      id: parseInt(id || '1'),
      username: 'jane_doe',
      first_name: 'Jane',
      last_name: 'Doe',
      birth_date: '1990-01-15T00:00:00.000Z',
      alias: 'Jany',
      created_at: '2024-01-01T00:00:00.000Z'
    }

    // Simular carga
    setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 1000)
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#ffffff' }} />
        </Box>
      </Container>
    )
  }

  if (error || !user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert 
            severity="error"
            sx={{
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.2)',
              color: '#ffffff'
            }}
          >
            {error || 'Usuario no encontrado'}
          </Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h2"
          sx={{
            color: '#ffffff',
            mb: 4,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Perfil de Usuario
        </Typography>

        <ProfileHeader elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
            <Avatar
              firstName={user.first_name}
              lastName={user.last_name}
              size="large"
            />
            
            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {user.first_name} {user.last_name}
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                @{user.alias}
              </Typography>
            </Box>
          </Box>

          <Box>
            <InfoRow>
              <InfoLabel>Usuario:</InfoLabel>
              <InfoValue>{user.username}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Nombre:</InfoLabel>
              <InfoValue>{user.first_name}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Apellido:</InfoLabel>
              <InfoValue>{user.last_name}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Alias:</InfoLabel>
              <InfoValue>@{user.alias}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Fecha de nacimiento:</InfoLabel>
              <InfoValue>{formatDate(user.birth_date)} ({calculateAge(user.birth_date)} años)</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Miembro desde:</InfoLabel>
              <InfoValue>{formatDate(user.created_at)}</InfoValue>
            </InfoRow>
          </Box>
        </ProfileHeader>
      </Box>
    </Container>
  )
}

export default ProfilePage