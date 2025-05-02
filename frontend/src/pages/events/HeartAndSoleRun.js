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
import { CalendarToday, LocationOn, DirectionsRun, Favorite, Timer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeartAndSoleRun = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #ff4081, #f50057)',
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
                <Chip label="marathon" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  The Heart & Sole Run 2025
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  A scenic run and fundraiser event featuring multiple distance categories. #MILESFORSMILES
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Feb 16, 2025</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>Carter Road, Bandra</Typography>
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
                Join us for The Heart & Sole Run 2025, a charitable marathon that combines fitness with giving back to the community. Run for a cause and make every mile count towards bringing smiles to those in need.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Race Categories
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsRun color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="21K Half Marathon" 
                    secondary="For experienced runners" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsRun color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="10K Run" 
                    secondary="Perfect for intermediate runners" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsRun color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="5K Fun Run" 
                    secondary="Open for all participants" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Event Highlights
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Professional timing system for accurate race timing
                </Typography>
                <Typography component="li" paragraph>
                  Hydration stations every 2.5km
                </Typography>
                <Typography component="li" paragraph>
                  Medical support throughout the route
                </Typography>
                <Typography component="li" paragraph>
                  Finisher medals and certificates
                </Typography>
                <Typography component="li" paragraph>
                  Post-run refreshments and entertainment
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Registration Details
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Date & Time
                </Typography>
                <Typography>February 16, 2025</Typography>
                <Typography>5:30 AM - Start Time</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Location
                </Typography>
                <Typography>Carter Road</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Registration Fee
                </Typography>
                <Typography>21K: ₹1000</Typography>
                <Typography>10K: ₹800</Typography>
                <Typography>5K: ₹500</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/heart-and-sole/register')}
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

export default HeartAndSoleRun; 