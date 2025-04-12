import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
} from '@mui/material';

const councilInfo = {
  rotaract: {
    name: 'Rotaract Club of CRCE',
    description: 'Organizing community service and professional development events',
    logo: '/images/councils/rotaract-logo.png',
    color: '#F7A81B',
  },
  gdsc: {
    name: 'Google Developer Student Clubs',
    description: 'Empowering students with technology and development skills',
    logo: '/images/councils/gdsc-logo.png',
    color: '#4285F4',
  },
  tedx: {
    name: 'TEDx CRCE',
    description: 'Bringing inspiring ideas and conversations to CRCE',
    logo: '/images/councils/tedx-logo.png',
    color: '#EB0028',
  },
  'student-council': {
    name: 'Student Council',
    description: 'The official student body organizing college-wide events',
    logo: '/images/councils/student-council-logo.png',
    color: '#1A237E',
  },
};

const CouncilEvents = () => {
  const { councilId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const council = councilInfo[councilId];

  useEffect(() => {
    // Fetch events for the specific council
    fetch(`http://localhost:8000/events?council=${councilId}`)
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error fetching events:', error));
  }, [councilId]);

  if (!council) {
    return (
      <Container>
        <Typography variant="h4">Council not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Council Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <img
          src={council.logo}
          alt={council.name}
          style={{ height: 100, marginBottom: 16 }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {council.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {council.description}
        </Typography>
      </Box>

      {/* Events Grid */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={event.image_url || '/images/events/default.jpg'}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {event.title}
                </Typography>
                <Chip
                  label={event.event_type}
                  sx={{
                    backgroundColor: council.color,
                    color: 'white',
                    mb: 2,
                  }}
                />
                <Typography color="text.secondary" gutterBottom>
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                {event.registration_fee && (
                  <Typography variant="subtitle2" color="text.secondary">
                    Registration Fee: ₹{event.registration_fee}
                  </Typography>
                )}
                {event.prizes && event.prizes.length > 0 && (
                  <Typography variant="subtitle2" color="text.secondary">
                    Prizes: {event.prizes.join(', ')}
                  </Typography>
                )}
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

export default CouncilEvents; 