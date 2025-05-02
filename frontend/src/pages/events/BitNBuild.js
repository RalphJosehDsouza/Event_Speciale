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
import { CalendarToday, LocationOn, Groups, EmojiEvents, Code } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BitNBuild = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/Bitnbuild.png)',
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
                <Chip label="hackathon" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  Bit N Build: Maharashtra Round
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  International Hackathon by Google Developer Student Clubs CRCE. 2-3 members per team, Rs.200 per team, Prize pool of Rs.100,000+
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Mar 15, 2024</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>FRCRCE Campus</Typography>
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
                Bit N Build is an international hackathon organized by Google Developer Student Clubs CRCE. This Maharashtra round brings together the brightest minds to solve real-world problems through technology and innovation.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Event Highlights
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Groups color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Team Formation" 
                    secondary="Form teams of 2-3 members" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Code color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Problem Statements" 
                    secondary="Choose from multiple real-world problem statements" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEvents color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Prizes" 
                    secondary="Total prize pool of Rs.100,000+" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Rules and Guidelines
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Teams must have 2-3 members
                </Typography>
                <Typography component="li" paragraph>
                  Registration fee is Rs.200 per team
                </Typography>
                <Typography component="li" paragraph>
                  24-hour coding period
                </Typography>
                <Typography component="li" paragraph>
                  Use of AI tools is allowed with proper documentation
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
                <Typography>March 15, 2024</Typography>
                <Typography>Starts at 9:00 AM</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Location
                </Typography>
                <Typography>FRCRCE Campus</Typography>
                <Typography>Fr. Conceicao Rodrigues College of Engineering</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Registration Fee
                </Typography>
                <Typography>Rs.200 per team</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/bitnbuild/register')}
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

export default BitNBuild; 