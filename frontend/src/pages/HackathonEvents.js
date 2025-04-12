import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';

const HackathonEvents = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    // Fetch hackathon events from the backend
    fetch('http://localhost:8000/events?category=hackathon')
      .then(response => response.json())
      .then(data => setHackathons(data.events))
      .catch(error => console.error('Error fetching hackathons:', error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Upcoming Hackathons
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Join our exciting coding competitions and showcase your skills
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {hackathons.map((hackathon) => (
          <Grid item xs={12} sm={6} md={4} key={hackathon.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={hackathon.image_url || '/images/hackathon-default.jpg'}
                alt={hackathon.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {hackathon.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {new Date(hackathon.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {hackathon.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Registration Deadline: {new Date(hackathon.registration_deadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/events/${hackathon.id}`)}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/register/${hackathon.id}`)}
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

export default HackathonEvents; 