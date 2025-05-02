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
import { CalendarToday, LocationOn, BeachAccess, MusicNote, Celebration } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Unplug = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/euphoria.png)',
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
                <Chip label="retreat" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  Unplug: By The Beach
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  A three-day, two-night retreat in Alibaug focusing on connecting, learning, and building your future.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Mar 28, 2024</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>Alibaug Beach Resort</Typography>
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
                About the Retreat
              </Typography>
              <Typography paragraph>
                Unplug is a unique beach retreat that combines professional development, wellness activities, and networking opportunities. Take a break from the digital world and connect with nature and fellow students in the serene setting of Alibaug.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Activities
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BeachAccess color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Beach Activities" 
                    secondary="Volleyball, Sandcastle Building, Beach Yoga" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MusicNote color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Evening Entertainment" 
                    secondary="Acoustic Night, Bonfire Sessions, Star Gazing" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Celebration color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Team Building" 
                    secondary="Group Activities, Adventure Sports, Workshops" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                What's Included
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Luxury beach resort accommodation
                </Typography>
                <Typography component="li" paragraph>
                  All meals and refreshments
                </Typography>
                <Typography component="li" paragraph>
                  Transportation from college
                </Typography>
                <Typography component="li" paragraph>
                  Professional instructors and guides
                </Typography>
                <Typography component="li" paragraph>
                  Activity equipment and materials
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Retreat Details
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Date & Time
                </Typography>
                <Typography>March 28-30, 2024</Typography>
                <Typography>Departure: 7:00 AM on March 28</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Meeting Point
                </Typography>
                <Typography>FRCRCE Campus</Typography>
                <Typography>Fr. Conceicao Rodrigues College of Engineering</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Package Cost
                </Typography>
                <Typography>₹8,000 per person</Typography>
                <Typography>(All-inclusive package)</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/unplug/register')}
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

export default Unplug; 