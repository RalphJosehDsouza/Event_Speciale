import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: 1,
      title: 'Annual Tech Fest',
      date: 'March 15-17, 2024',
      image: '/images/tech-fest.jpg',
      description: 'Join us for three days of technical workshops, competitions, and networking.',
    },
    {
      id: 2,
      title: 'Hackathon 2024',
      date: 'April 5-6, 2024',
      image: '/images/hackathon.jpg',
      description: '48-hour coding competition with exciting prizes and learning opportunities.',
    },
    {
      id: 3,
      title: 'Cultural Festival',
      date: 'May 10-12, 2024',
      image: '/images/cultural.jpg',
      description: 'Celebrate diversity with music, dance, and cultural performances.',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ minHeight: '80vh', py: 8 }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to FCRIT Events
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Discover and participate in exciting events at Father Conceicao Rodrigues Institute of Technology
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/events')}
          >
            Explore Events
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="/images/college-building.jpg"
            alt="FCRIT Campus"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>

      {/* Featured Events */}
      <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 8, mb: 4 }}>
        Featured Events
      </Typography>
      <Grid container spacing={4}>
        {featuredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {event.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {event.date}
                </Typography>
                <Typography>
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/register/${event.id}`)}
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 