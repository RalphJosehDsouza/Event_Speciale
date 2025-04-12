import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const clubNames = {
  rotaract: 'Rotaract Club',
  gdsc: 'Google Developer Student Club',
  tedx: 'TEDx CRCE',
  student_council: 'Student Council'
};

const ClubPage = () => {
  const { council } = useParams();
  const [clubEvents, setClubEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events?council=${council}`);
        setClubEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch club events. Please try again later.');
        setLoading(false);
        console.error('Error fetching club events:', err);
      }
    };

    fetchClubEvents();
  }, [council]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
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
          textTransform: 'capitalize',
        }}
      >
        {council} Events
      </Typography>

      <Grid container spacing={4}>
        {clubEvents.map((event, index) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {event.image_url && (
                  <CardMedia
                    component="img"
                    height="240"
                    image={event.image_url}
                    alt={event.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description.length > 150
                      ? `${event.description.substring(0, 150)}...`
                      : event.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={event.event_type}
                        color="primary"
                        size="small"
                        sx={{ borderRadius: '12px' }}
                      />
                      <Chip
                        label={new Date(event.date).toLocaleDateString()}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: '12px' }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      href={`/events/${event.id}`}
                      sx={{
                        borderRadius: '12px',
                        py: 1,
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
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClubPage; 