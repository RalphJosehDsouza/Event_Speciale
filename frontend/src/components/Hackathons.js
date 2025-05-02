import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Schedule, LocationOn, AttachMoney, Group } from '@mui/icons-material';

const Hackathons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample data - Replace with actual hackathon data
  const hackathons = [
    {
      id: 1,
      title: "FRCRCE Hackathon 2024",
      description: "Join us for the biggest hackathon of the year! Build innovative solutions and win exciting prizes.",
      date: "2024-04-15",
      location: "FRCRCE Campus",
      registration_fee: "Free",
      team_size: "2-4 members",
      image: "/images/hackathon1.jpg",
      tracks: ["Web Development", "AI/ML", "Blockchain", "IoT"],
      prizes: ["₹50,000", "₹30,000", "₹20,000"],
      contact: {
        email: "hackathon@frcrce.ac.in",
        phone: "+91 9876543210"
      }
    },
    // Add more hackathons here
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % hackathons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hackathons.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Upcoming Hackathons
      </Typography>

      <Grid container spacing={4}>
        {hackathons.map((hackathon, index) => (
          <Grid item xs={12} key={hackathon.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0.5,
                y: index === activeIndex ? 0 : 20,
                scale: index === activeIndex ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveIndex(index)}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: isMobile ? '100%' : '40%',
                    height: isMobile ? 200 : 'auto',
                    objectFit: 'cover'
                  }}
                  image={hackathon.image}
                  alt={hackathon.title}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {hackathon.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {hackathon.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>Event Details</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ mr: 1 }} />
                      <Typography>{formatDate(hackathon.date)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1 }} />
                      <Typography>{hackathon.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoney sx={{ mr: 1 }} />
                      <Typography>{hackathon.registration_fee}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Group sx={{ mr: 1 }} />
                      <Typography>Team Size: {hackathon.team_size}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>Tracks</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {hackathon.tracks.map((track, i) => (
                        <Chip key={i} label={track} color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>Prizes</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {hackathon.prizes.map((prize, i) => (
                        <Chip 
                          key={i} 
                          label={prize} 
                          color={i === 0 ? 'primary' : 'secondary'} 
                          variant="outlined" 
                        />
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 'auto' }}
                    href={`/register/${hackathon.id}`}
                  >
                    Register Now
                  </Button>
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