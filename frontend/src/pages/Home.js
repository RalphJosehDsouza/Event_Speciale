import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Event, ArrowForward } from '@mui/icons-material';
import FeaturedEvents from '../components/FeaturedEvents';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
          <Typography variant="h2" component="h1" gutterBottom>
                  FRCRCE Events
          </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                  Discover and participate in exciting events at Fr. Conceicao Rodrigues College of Engineering
          </Typography>
          <Button
            variant="contained"
                  color="secondary"
            size="large"
            onClick={() => navigate('/events')}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
          >
            Explore Events
          </Button>
              </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
              <motion.img
                src="/images/campus.png"
                alt="FRCRCE Campus"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
          />
        </Grid>
      </Grid>
        </Container>
      </Box>

      {/* Featured Events Section */}
      <FeaturedEvents />

      {/* Regular Events Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Event sx={{ color: 'primary.main', fontSize: '2rem' }} />
            <Typography variant="h3" component="h2">
              Upcoming Events
      </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card 
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    Browse All Events
                </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    Discover a wide range of technical, cultural, and professional events happening at FRCRCE.
                </Typography>
                <Button
                    variant="contained"
                  color="primary"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/events')}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5,
                      px: 3,
                      py: 1
                    }}
                >
                    View All Events
                </Button>
                </CardContent>
            </Card>
          </Grid>
      </Grid>
    </Container>
      </Box>
    </Box>
  );
};

export default Home; 