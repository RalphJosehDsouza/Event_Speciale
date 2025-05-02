import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Event, LocationOn, Person, AccessTime } from '@mui/icons-material';

const EventDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real application, you would fetch this data based on the event ID
  // For now, we'll use the featuredEvents data from Home.js
  const event = {
    id: parseInt(id),
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest technical festival of the year featuring competitions, workshops, and exciting prizes!",
    image: "/images/tech-fest.jpg",
    date: "March 15-17, 2024",
    category: "Technical",
    location: "FRCRCE Campus, Bandra",
    organizer: "Technical Committee",
    time: "9:00 AM - 5:00 PM",
    detailedDescription: `Experience the cutting-edge of technology at FRCRCE's Annual Tech Fest 2024. 
    This three-day extravaganza brings together brilliant minds, innovative projects, and exciting competitions.
    
    Highlights:
    - Technical workshops by industry experts
    - Project showcase competition
    - Coding challenges
    - Robotics demonstrations
    - IoT and AI workshops
    
    Don't miss this opportunity to learn, compete, and network with fellow tech enthusiasts!`
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Event Image and Basic Info */}
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="400"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={event.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h4" component="h1" gutterBottom>
                    {event.title}
                  </Typography>
                </Box>
                
                {/* Event Details */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Event sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{event.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{event.time}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{event.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Person sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{event.organizer}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Detailed Description */}
                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {event.detailedDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Registration Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ready to Participate?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Register now to secure your spot at this exciting event!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate(`/register/${event.id}`)}
                  sx={{ mb: 2 }}
                >
                  Register Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Back to Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default EventDetails; 