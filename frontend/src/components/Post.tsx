import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
} from '@mui/material'
import {
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import Button from './Button'
import Avatar from './Avatar'
import type { Post as PostType } from '../types/post'

interface PostProps {
  post?: PostType
  onLike?: (postId: number) => void
  mode?: 'readonly' | 'editable'
  onSubmit?: (message: string) => void
  onCancel?: () => void
}

const StyledPaper = styled(Paper)(() => ({
  background: '#111111',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: '24px',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
  },
}))

const LikeButton = styled(IconButton)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    color: '#ff4757',
    transform: 'scale(1.1)',
    '&::before': {
      transform: 'scale(1)',
      opacity: 0.2,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, #ff4757 0%, transparent 70%)',
    transform: 'translate(-50%, -50%) scale(0)',
    transition: 'all 0.3s ease',
    opacity: 0,
    borderRadius: '50%',
  },
  '&.liked': {
    color: '#ff4757',
    '&::before': {
      transform: 'translate(-50%, -50%) scale(1.5)',
      opacity: 0.1,
    },
  },
}))

const Post: React.FC<PostProps> = ({
  post,
  onLike,
  mode = 'readonly',
  onSubmit,
  onCancel,
}) => {
  const { id, message, created_at, user, likedByCurrentUser, totalLikes } = post || {}
  const [isLiked, setIsLiked] = useState(likedByCurrentUser || false)
  const [editMessage, setEditMessage] = useState(message || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Hace unos minutos'
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays}d`
    }
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
    if (id && onLike) {
      onLike(id)
    }
  }

  const handleSubmit = async () => {
    if (!editMessage.trim() || !onSubmit) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(editMessage.trim())
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditMessage(message || '')
    if (onCancel) {
      onCancel()
    }
  }

  // Modo editable
  if (mode === 'editable') {
    return (
      <StyledPaper elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar
            firstName={user?.first_name || 'T'}
            lastName={user?.last_name || 'U'}
            size="medium"
          />
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
           
            
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="¿Qué estás pensando?"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="filled"
                customSize="small"
                onClick={handleSubmit}
                disabled={!editMessage?.trim() || isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledPaper>
    )
  }

  // Modo readonly
  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar
          firstName={user?.first_name || '?'}
          lastName={user?.last_name || '?'}
          size="medium"
        />
        
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {user ? `${user.first_name} ${user.last_name}` : 'Usuario'}
            </Typography>
            {user?.alias && (
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.875rem',
                }}
              >
                @{user.alias}
              </Typography>
            )}
            {created_at && <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem',
                ml: 'auto',
              }}
            >
              {formatDate(created_at)}
            </Typography>}
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff',
              lineHeight: 1.6,
              mb: 2,
              fontSize: '0.95rem',
              textAlign: 'left',
            }}
          >
            {message}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LikeButton
              onClick={handleLikeClick}
              className={isLiked ? 'liked' : ''}
              size="small"
            >
              {isLiked ? <Favorite /> : <FavoriteBorder />}
            </LikeButton>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem',
              }}
            >
              {totalLikes}
            </Typography>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  )
}

export default Post