import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [currentHackathon, setCurrentHackathon] = useState(0);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hackathons');
        setHackathons(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  useEffect(() => {
    if (hackathons.length > 0) {
      const interval = setInterval(() => {
        setCurrentHackathon((prev) => (prev + 1) % hackathons.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hackathons]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: 50,
            height: 50,
            border: '4px solid #2196F3',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 6,
        }}
      >
        Upcoming Hackathons
      </Typography>

      <Box sx={{ position: 'relative', minHeight: '400px', mb: 6 }}>
        <AnimatePresence mode="wait">
          {hackathons.length > 0 && (
            <motion.div
              key={currentHackathon}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
              >
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={hackathons[currentHackathon].image_url}
                      alt={hackathons[currentHackathon].title}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                        {hackathons[currentHackathon].title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {hackathons[currentHackathon].description}
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                          variant="contained"
                          size="large"
                          href={`/events/${hackathons[currentHackathon].id}`}
                          sx={{
                            borderRadius: '12px',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <Grid container spacing={4}>
        {hackathons.map((hackathon, index) => (
          <Grid item key={hackathon.id} xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  },
                }}
                onClick={() => setCurrentHackathon(index)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={hackathon.image_url}
                  alt={hackathon.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {hackathon.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hackathon.date}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Hackathons; 