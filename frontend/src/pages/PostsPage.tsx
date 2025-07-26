import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Post from '../components/Post'
import type { PostsApiResponse } from '../types/post'
import { postsService } from '../services/postsService'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPagination-ul': {
    justifyContent: 'center',
  },
  '& .MuiPaginationItem-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    margin: '0 4px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
    },
    '&.Mui-selected': {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #ffffff',
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
      '&:hover': {
        backgroundColor: '#f8f9fa',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      },
    },
    '&.MuiPaginationItem-ellipsis': {
      color: 'rgba(255, 255, 255, 0.5)',
      border: 'none',
    },
  },
}))

const PostsPage = () => {
  const [postsData, setPostsData] = useState<PostsApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const authContext = useContext(AuthContext)
  const pageSize = 10

  const fetchPosts = (page: number) => {
    if (!authContext?.token) {
      setError('No estás autenticado.')
      return
    }
    setError('')
    setLoading(true)
    postsService.getPosts(page, pageSize, authContext?.token)
      .then(response => {
        setPostsData(response.data)
      })
      .catch(() => {
        setError('Error obteniendo los posts')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPosts(currentPage) 
  }, [])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCreatePost = (message: string) => {
    if (!authContext?.token) {
      setError('No estás autenticado para crear un post.')
      return
    }

    postsService.createPost(message, authContext.token)
      .then(() => {
        // Después de crear el post, recargar la primera página
        if (currentPage !== 1) {
          setCurrentPage(1)
        } else {
          fetchPosts(1)
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Error al crear el post.')
        } else {
          setError('Error de conexión o desconocido.')
        }
      })
  }

  const handleLike = (postId: number) => {
    if (!authContext?.token) {
      setError("No estás autenticado para dar like.")
      return
    }

    if (!postsData) return;

    const post = postsData.elements.find(p => p.id === postId)
    if (!post) return

    // Actualización optimista de la UI
    const updatedPosts = postsData.elements.map(p => {
      if (p.id === postId) {
        const likedByCurrentUser = !p.likedByCurrentUser
        const likesCount = p.totalLikes + (likedByCurrentUser ? 1 : -1)
        return {
          ...p,
          likedByCurrentUser,
          totalLikes: likesCount,
        }
      }
      return p
    })
    setPostsData({ ...postsData, elements: updatedPosts })

    // Llamada a la API
    const action = post.likedByCurrentUser
      ? postsService.unlikePost
      : postsService.likePost
    action(postId, authContext.token).catch(() => {
      setError("Error al procesar el like. Inténtalo de nuevo.")
      // Revertir la actualización optimista si hay un error
      setPostsData(postsData)
    })
  }

  const totalPages = postsData ? Math.ceil(postsData.total / postsData.size) : 0

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

  if (error) {
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
            {error}
          </Alert>
        </Box>
      </Container>
    )
  }

  if (!postsData) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert 
            severity="info"
            sx={{
              backgroundColor: 'rgba(13, 110, 253, 0.1)',
              border: '1px solid rgba(13, 110, 253, 0.2)',
              color: '#ffffff'
            }}
          >
            No hay posts disponibles
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
          Feed
        </Typography>

        {/* Editor de post fijo en la parte superior */}
        <Box sx={{ mb: 3 }}>
          <Post
            mode="editable"
            onSubmit={handleCreatePost}
          />
        </Box>

        {/* Información de paginación */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.875rem',
            }}
          >
            Mostrando {postsData.elements.length} de {postsData.total} posts 
            (Página {postsData.page} de {totalPages})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {postsData.elements.map((post) => (
            <Post
              key={post.id}
              mode="readonly"
              post={post}
              onLike={handleLike}
            />
          ))}
        </Box>

        {/* Paginación */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <StyledPagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

      </Box>
    </Container>
  )
}

export default PostsPage