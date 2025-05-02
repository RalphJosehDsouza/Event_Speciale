import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeaturedEvents = () => {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: 1,
      title: "TEDxCRCE 2025: Beyond the Spectrum",
      description: "Step into a world where stories break barriers and push limits! Experience impactful TED Talks, connect with inspiring speakers, enjoy dinner and networking opportunities.",
      image: "/images/tedx.png",
      date: "January 31, 2025",
      category: "Conference",
      path: "/events/tedx"
    },
    {
      id: 2,
      title: "Bit N Build: Maharashtra Round",
      description: "International Hackathon by Google Developer Student Clubs CRCE. 2-3 members per team, Rs.200 per team, Prize pool of Rs.100,000+",
      image: "/images/Bitnbuild.png",
      date: "March 15, 2024",
      category: "Hackathon",
      path: "/events/bitnbuild"
    },
    {
      id: 3,
      title: "CRMD 2024: Maze of Conflict",
      description: "Annual technical and cultural festival by Fr. CRCE Student Council.",
      image: "/images/crmd.png",
      date: "March 25, 2024",
      category: "Technical",
      path: "/events/crmd"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold'
          }}>
          <span style={{ color: '#1976d2' }}>★</span> Featured Events
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {featuredEvents.map((event) => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={event.image}
                alt={event.title}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Chip
                  label={event.category}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h5" component="h2" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                  {event.date}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(event.path)}
                  sx={{
                    mt: 'auto',
                    textTransform: 'none',
                    borderRadius: 1.5
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedEvents; 