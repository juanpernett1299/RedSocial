import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Avatar from '../components/Avatar'
import type { User } from '../types/user'
import { userService } from '../services/userService'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const ProfileHeader = styled(Paper)(() => ({
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

const InfoRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
}))

const InfoLabel = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.875rem',
  fontWeight: 500,
  minWidth: '120px',
}))

const InfoValue = styled(Typography)(() => ({
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 400,
}))

const ProfilePage = () => {
  const authContext = useContext(AuthContext)
  const user = authContext?.userInfo


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

  if (!user) {
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
            { 'Usuario no encontrado'}
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