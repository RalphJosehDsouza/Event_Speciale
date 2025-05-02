import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 'tedx',
      title: 'TEDxCRCE 2025: Beyond the Spectrum',
      description: 'Step into a world where stories break barriers and push limits! Experience impactful TED Talks, connect with inspiring speakers, enjoy dinner and networking opportunities.',
      image: '/images/tedx.png',
      date: 'Jan 31, 2025',
      category: 'conference',
      path: '/events/tedx'
    },
    {
      id: 'heart-and-sole',
      title: 'The Heart & Sole Run 2025',
      description: 'A scenic run and fundraiser event featuring multiple distance categories. #MILESFORSMILES',
      image: '/images/run.png',
      date: 'Feb 16, 2025',
      category: 'marathon',
      path: '/events/heart-and-sole'
    },
    {
      id: 'footslog',
      title: 'Footslog: Kothaligad Trek',
      description: 'Take only memories, leave only footprints. Join us for an adventurous trek to Kothaligad fort.',
      image: '/images/trek.png',
      date: 'Jul 27, 2024',
      category: 'trek',
      path: '/events/footslog'
    },
    {
      id: 'bitnbuild',
      title: 'Bit N Build: Maharashtra Round',
      description: 'International Hackathon by Google Developer Student Clubs CRCE. 2-3 members per team, Rs.200 per team, Prize pool of Rs.100,000+',
      image: '/images/Bitnbuild.png',
      date: 'Mar 15, 2024',
      category: 'hackathon',
      path: '/events/bitnbuild'
    },
    {
      id: 'unplug',
      title: 'Unplug: By The Beach',
      description: 'A three-day, two-night retreat in Alibaug focusing on connecting, learning, and building your future.',
      image: '/images/unplug.png',
      date: 'Mar 28, 2024',
      category: 'retreat',
      path: '/events/unplug'
    },
    {
      id: 'athlead',
      title: 'Athlead 2024',
      description: 'INSPIRE. COMPETE. ACHIEVE. Annual sports event by the Student Council.',
      image: '/images/sports.png',
      date: 'Apr 15, 2024',
      category: 'sports',
      path: '/events/athlead'
    },
    {
      id: 'crmd',
      title: 'CRMD 2024: Maze of Conflict',
      description: 'Annual technical and cultural festival by Fr. CRCE Student Council.',
      image: '/images/crmd.png',
      date: 'Mar 25, 2024',
      category: 'technical',
      path: '/events/crmd'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        All Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
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
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={event.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {event.date}
                  </Typography>
                </Box>
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

export default Events; 