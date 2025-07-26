import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar as MuiAvatar,
} from '@mui/material'
import {
  Person,
  Logout,
  ExpandMore,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const StyledAppBar = styled(AppBar)(() => ({
  background: '#111111',
  border: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}))

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  minHeight: '64px',
}))

const Logo = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.8)',
  },
}))

const UserSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  padding: '8px 12px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
  },
}))

const UserAvatar = styled(MuiAvatar)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  width: 36,
  height: 36,
  fontSize: '0.875rem',
  fontWeight: 600,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
}))

const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    background: '#111111',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginTop: '8px',
    minWidth: '200px',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
  },
}))

const StyledMenuItem = styled(MenuItem)(() => ({
  color: '#ffffff',
  padding: '12px 16px',
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '12px',
    fontSize: '1.2rem',
  },
}))

const Layout: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const open = Boolean(anchorEl)

  const currentUser = authContext?.userInfo

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    handleMenuClose()
  }

  const handleLogout = () => {
    if (authContext) {
      authContext.logout()
    }
    handleMenuClose()
  }

  const handleLogoClick = () => {
    navigate('/posts')
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#000000' }}>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <Logo onClick={handleLogoClick}>
            RedSocial
          </Logo>

          <UserSection onClick={handleMenuClick}>
            <UserAvatar>
              {getInitials(currentUser?.first_name || '', currentUser?.last_name || '')}
            </UserAvatar>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {currentUser?.first_name} {currentUser?.last_name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.75rem',
                }}
              >
                @{currentUser?.alias || ''}
              </Typography>
            </Box>
            <ExpandMore
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'transform 0.3s ease',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </UserSection>
        </StyledToolbar>
      </StyledAppBar>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledMenuItem onClick={handleProfileClick}>
          <Person />
          Ver Perfil
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <Logout />
          Cerrar Sesión
        </StyledMenuItem>
      </StyledMenu>

      {/* Contenido de las páginas */}
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout