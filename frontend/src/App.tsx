import { Box } from '@mui/material'
import AppRoutes from './routes/routes'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: '#000000',
          position: 'relative',
        }}
      >
        <AppRoutes />
      </Box>
    </AuthProvider>
  )
}

export default App