import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#f8f9fa',
      dark: '#e9ecef',
    },
    secondary: {
      main: '#6c757d',
      light: '#adb5bd',
      dark: '#495057',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#adb5bd',
    },
    success: {
      main: '#28a745',
      light: '#34ce57',
      dark: '#1e7e34',
    },
    error: {
      main: '#dc3545',
      light: '#e57373',
      dark: '#c62828',
    },
    warning: {
      main: '#ffc107',
      light: '#ffeb3b',
      dark: '#ff8f00',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
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
        },
        contained: {
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
})