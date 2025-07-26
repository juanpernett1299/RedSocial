import React from 'react'
import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/material/styles'

interface CustomButtonProps {
  variant?: 'filled' | 'outline'
  customSize?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const StyledButton = styled(MuiButton)<{ customvariant: string; customsize: string }>(
  ({ theme, customvariant, customsize }) => ({
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Tamaños
    ...(customsize === 'small' && {
      padding: '8px 16px',
      fontSize: '0.875rem',
    }),
    ...(customsize === 'medium' && {
      padding: '12px 24px',
      fontSize: '1rem',
    }),
    ...(customsize === 'large' && {
      padding: '16px 32px',
      fontSize: '1.1rem',
    }),

    // Efecto glow animado
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s',
    },
    '&:hover::before': {
      transform: 'translateX(100%)',
    },

    // Variante filled
    ...(customvariant === 'filled' && {
      background: '#ffffff',
      color: '#000000',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
      '&:hover': {
        background: '#f8f9fa',
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
      },
      '&:disabled': {
        background: 'rgba(255, 255, 255, 0.3)',
        color: 'rgba(0, 0, 0, 0.5)',
      },
    }),

    // Variante outline
    ...(customvariant === 'outline' && {
      background: 'transparent',
      color: '#ffffff',
      border: '2px solid #ffffff',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
        transform: 'translateY(-2px)',
        borderColor: '#ffffff',
      },
      '&:disabled': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
        color: 'rgba(255, 255, 255, 0.3)',
      },
    }),
  })
)

const Button: React.FC<CustomButtonProps> = ({ 
  variant = 'filled', 
  customSize = 'medium', 
  children, 
  ...props 
}) => {
  return (
    <StyledButton
      customvariant={variant}
      customsize={customSize}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button