import React, { useState, useEffect } from 'react'
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

interface User {
  id: number
  first_name: string
  last_name: string
  alias: string
}

interface PostData {
  id: number
  message: string
  created_at: string
  user: User
}

interface PostsResponse {
  elements: PostData[]
  size: number
  page: number
  total: number
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
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
  const [postsData, setPostsData] = useState<PostsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const fetchPosts = async (page: number) => {
    setLoading(true)
    setError('')
    
    // TODO: Conectar con el servicio de posts
    // Datos de ejemplo por ahora
    const allMockPosts: PostData[] = [
      // Página 1
      { id: 1, message: "¡Hola mundo! Este es mi primer post en la red social.", created_at: "2024-01-15T10:30:00.000Z", user: { id: 1, first_name: "Jane", last_name: "Doe", alias: "Jany" }},
      { id: 2, message: "Configurando mi nueva cuenta. ¡Espero conocer gente interesante!", created_at: "2024-01-15T09:15:00.000Z", user: { id: 2, first_name: "John", last_name: "Smith", alias: "Johnny" }},
      { id: 3, message: "¿Alguien más piensa que el desarrollo web es fascinante? Cada día aprendo algo nuevo.", created_at: "2024-01-14T16:45:00.000Z", user: { id: 1, first_name: "Jane", last_name: "Doe", alias: "Jany" }},
      { id: 4, message: "Trabajando en un nuevo proyecto. ¡Muy emocionado por los resultados!", created_at: "2024-01-14T14:20:00.000Z", user: { id: 3, first_name: "Alice", last_name: "Johnson", alias: "AliceJ" }},
      { id: 5, message: "El café de esta mañana estaba perfecto ☕", created_at: "2024-01-14T08:30:00.000Z", user: { id: 2, first_name: "John", last_name: "Smith", alias: "Johnny" }},
      { id: 6, message: "Reflexionando sobre los cambios que trae el nuevo año.", created_at: "2024-01-13T19:45:00.000Z", user: { id: 4, first_name: "Bob", last_name: "Wilson", alias: "BobW" }},
      { id: 7, message: "¿Alguien ha probado la nueva librería de React? Parece prometedora.", created_at: "2024-01-13T15:10:00.000Z", user: { id: 1, first_name: "Jane", last_name: "Doe", alias: "Jany" }},
      { id: 8, message: "Día productivo en la oficina. Terminé todas las tareas pendientes.", created_at: "2024-01-13T12:00:00.000Z", user: { id: 3, first_name: "Alice", last_name: "Johnson", alias: "AliceJ" }},
      { id: 9, message: "Los domingos son perfectos para descansar y planificar la semana.", created_at: "2024-01-12T16:30:00.000Z", user: { id: 2, first_name: "John", last_name: "Smith", alias: "Johnny" }},
      { id: 10, message: "Aprendiendo nuevas tecnologías nunca se detiene en este campo.", created_at: "2024-01-12T11:15:00.000Z", user: { id: 4, first_name: "Bob", last_name: "Wilson", alias: "BobW" }},
      // Página 2
      { id: 11, message: "Segunda página de posts para probar la paginación.", created_at: "2024-01-11T20:00:00.000Z", user: { id: 1, first_name: "Jane", last_name: "Doe", alias: "Jany" }},
      { id: 12, message: "La paginación está funcionando correctamente.", created_at: "2024-01-11T18:30:00.000Z", user: { id: 2, first_name: "John", last_name: "Smith", alias: "Johnny" }},
      { id: 13, message: "Más contenido para llenar las páginas.", created_at: "2024-01-11T16:45:00.000Z", user: { id: 3, first_name: "Alice", last_name: "Johnson", alias: "AliceJ" }},
      { id: 14, message: "Testing, testing, 1, 2, 3...", created_at: "2024-01-11T14:20:00.000Z", user: { id: 4, first_name: "Bob", last_name: "Wilson", alias: "BobW" }},
      { id: 15, message: "¡La funcionalidad de paginación se ve genial!", created_at: "2024-01-11T12:10:00.000Z", user: { id: 1, first_name: "Jane", last_name: "Doe", alias: "Jany" }},
    ]

    // Simular paginación
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPosts = allMockPosts.slice(startIndex, endIndex)
    
    const mockResponse: PostsResponse = {
      elements: paginatedPosts,
      size: pageSize,
      page: page,
      total: allMockPosts.length
    }

    // Simular carga
    setTimeout(() => {
      setPostsData(mockResponse)
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCreatePost = (message: string) => {
    // TODO: Conectar con el servicio de posts
    console.log('Creating post:', message)
    // Después de crear el post, recargar la primera página
    if (currentPage !== 1) {
      setCurrentPage(1)
    } else {
      fetchPosts(1)
    }
  }

  const handleLike = (postId: number) => {
    // TODO: Conectar con el servicio de likes
    console.log(`Like post ${postId}`)
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
            onCancel={() => {}} // No necesario cancelar en modo fijo
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
              id={post.id}
              message={post.message}
              createdAt={post.created_at}
              user={post.user}
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