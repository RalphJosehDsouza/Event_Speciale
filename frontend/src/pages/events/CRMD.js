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
import { CalendarToday, LocationOn, Code, MusicNote, EmojiEvents } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CRMD = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #6200ea, #3700b3)',
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
                <Chip label="technical" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  CRMD 2024: Maze of Conflict
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Annual technical and cultural festival by Fr. CRCE Student Council.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Mar 25, 2024</Typography>
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
                CRMD 2024: Maze of Conflict is FRCRCE's flagship technical and cultural festival that brings together the brightest minds and creative talents. Experience a fusion of technology and culture in this three-day extravaganza.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Event Categories
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Code color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Technical Events" 
                    secondary="Coding competitions, Robotics, Project Exhibition" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MusicNote color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cultural Events" 
                    secondary="Dance, Music, Drama, Art Exhibition" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEvents color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Competitions" 
                    secondary="Paper Presentation, Debate, Quiz" 
                  />
                </ListItem>
              </List>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Event Highlights
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Prize pool worth over ₹2,00,000
                </Typography>
                <Typography component="li" paragraph>
                  Industry expert talks and workshops
                </Typography>
                <Typography component="li" paragraph>
                  Live performances and entertainment
                </Typography>
                <Typography component="li" paragraph>
                  Networking opportunities
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
                <Typography>March 25-27, 2024</Typography>
                <Typography>9:00 AM - 6:00 PM</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Venue
                </Typography>
                <Typography>FRCRCE Campus</Typography>
                <Typography>Fr. Conceicao Rodrigues College of Engineering</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Registration Fee
                </Typography>
                <Typography>FRCRCE Students: ₹300</Typography>
                <Typography>Other College Students: ₹500</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/crmd/register')}
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

export default CRMD; 