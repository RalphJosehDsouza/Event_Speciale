import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Event, Home, Code } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Events', path: '/events', icon: <Event /> },
    { text: 'Hackathons', path: '/hackathons', icon: <Code /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Typography
        variant="h6"
        component={RouterLink}
        to="/"
        sx={{
          textDecoration: 'none',
          color: 'primary.main',
          fontWeight: 700,
          fontSize: '1.5rem',
          mb: 2,
          display: 'block',
        }}
      >
        FRCRCE
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'primary.main',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
          <Typography
            variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          FRCRCE
          </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 240,
                  boxSizing: 'border-box',
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
        </Toolbar>
    </AppBar>
  );
};

export default Navbar; 