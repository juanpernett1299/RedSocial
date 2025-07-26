import React from 'react'
import { Avatar as MuiAvatar } from '@mui/material'
import { styled } from '@mui/material/styles'

interface AvatarProps {
  firstName: string
  lastName: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const StyledAvatar = styled(MuiAvatar)<{ avatarsize: string }>(
  ({ theme, avatarsize }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontWeight: 600,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    
    // Tamaños
    ...(avatarsize === 'small' && {
      width: 32,
      height: 32,
      fontSize: '0.75rem',
    }),
    ...(avatarsize === 'medium' && {
      width: 48,
      height: 48,
      fontSize: '1rem',
    }),
    ...(avatarsize === 'large' && {
      width: 80,
      height: 80,
      fontSize: '1.5rem',
    }),

    '&:hover': {
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
      transform: 'scale(1.05)',
    },
  })
)

const Avatar: React.FC<AvatarProps> = ({ 
  firstName, 
  lastName, 
  size = 'medium',
  onClick 
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <StyledAvatar
      avatarsize={size}
      onClick={onClick}
    >
      {getInitials(firstName, lastName)}
    </StyledAvatar>
  )
}

export default Avatar