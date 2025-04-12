import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            FRCRCE Bandra
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Where Innovation Meets Excellence
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/events')}
            sx={{
              backgroundColor: '#ff4d4d',
              '&:hover': {
                backgroundColor: '#ff3333',
              },
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
            }}
          >
            Explore Events
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero; 