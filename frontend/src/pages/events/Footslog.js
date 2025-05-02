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
import { CalendarToday, LocationOn, Terrain, DirectionsWalk } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footslog = () => {
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
                <Chip label="trek" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  Footslog: Kothaligad Trek
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Take only memories, leave only footprints. Join us for an adventurous trek to Kothaligad fort.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Jul 27, 2024</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>Kothaligad Fort</Typography>
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
                About the Trek
              </Typography>
              <Typography paragraph>
                Embark on an exciting trek to Kothaligad (also known as Peth Fort), a historic fortress located in the Karjat region. Experience the thrill of hiking through scenic trails while learning about the rich history of Maharashtra.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Trek Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Terrain color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Difficulty Level" 
                    secondary="Moderate (Suitable for beginners with good fitness)" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsWalk color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Duration" 
                    secondary="6-7 hours (round trip)" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                What to Expect
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Professional trek leaders and guides
                </Typography>
                <Typography component="li" paragraph>
                  First aid and safety equipment
                </Typography>
                <Typography component="li" paragraph>
                  Breakfast and packed lunch
                </Typography>
                <Typography component="li" paragraph>
                  Transportation from college to trek base
                </Typography>
                <Typography component="li" paragraph>
                  Photography and documentation
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Trek Information
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Date & Time
                </Typography>
                <Typography>July 27, 2024</Typography>
                <Typography>5:00 AM - Assembly at College</Typography>
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
                  Registration Fee
                </Typography>
                <Typography>₹800 per person</Typography>
                <Typography>(Includes transport, food, and equipment)</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/footslog/register')}
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

export default Footslog; 