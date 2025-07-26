import { Box } from '@mui/material'
import AppRoutes from './routes/routes'

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#000000',
        position: 'relative',
      }}
    >
      <AppRoutes />
    </Box>
  )
}

export default App