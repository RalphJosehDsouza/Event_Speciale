import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CalendarToday, LocationOn, SportsBasketball, EmojiEvents, Groups } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Athlead = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/campus.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip label="sports" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  Athlead 2024
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  INSPIRE. COMPETE. ACHIEVE. Annual sports event by the Student Council.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Apr 15, 2024</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>FRCRCE Sports Ground</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Event Details */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom>
                About the Event
              </Typography>
              <Typography paragraph>
                Athlead 2024 is FRCRCE's premier sports event that brings together athletes and sports enthusiasts from across departments. Compete in various sports categories and showcase your athletic prowess.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Sports Categories
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SportsBasketball color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Team Sports" 
                    secondary="Cricket, Football, Basketball, Volleyball" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SportsBasketball color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Individual Sports" 
                    secondary="Athletics, Table Tennis, Badminton, Chess" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Groups color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fun Events" 
                    secondary="Tug of War, Relay Games, Fun Races" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Event Highlights
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Professional referees and judges
                </Typography>
                <Typography component="li" paragraph>
                  State-of-the-art sports equipment
                </Typography>
                <Typography component="li" paragraph>
                  Medical support throughout the event
                </Typography>
                <Typography component="li" paragraph>
                  Medals and trophies for winners
                </Typography>
                <Typography component="li" paragraph>
                  Certificates for all participants
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Event Details
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Date & Time
                </Typography>
                <Typography>April 15, 2024</Typography>
                <Typography>8:00 AM - 6:00 PM</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Venue
                </Typography>
                <Typography>FRCRCE Sports Ground</Typography>
                <Typography>Fr. Conceicao Rodrigues College of Engineering</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Registration Fee
                </Typography>
                <Typography>Individual Sports: ₹100</Typography>
                <Typography>Team Sports: ₹500 per team</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/athlead/register')}
              >
                Register Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Athlead; 