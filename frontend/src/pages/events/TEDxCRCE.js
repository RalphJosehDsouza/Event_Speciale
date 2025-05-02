import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CalendarToday, LocationOn, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TEDxCRCE = () => {
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
                <Chip label="conference" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="h2" component="h1" gutterBottom>
                  TEDxCRCE 2025: Beyond the Spectrum
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Step into a world where stories break barriers and push limits! Experience impactful TED Talks, connect with inspiring speakers, enjoy dinner and networking opportunities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday />
                    <Typography>Jan 31, 2025</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn />
                    <Typography>FRCRCE Auditorium</Typography>
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
                TEDxCRCE 2025 brings together thought leaders, innovators, and changemakers to share ideas that transcend conventional boundaries. This year's theme, "Beyond the Spectrum," challenges speakers and attendees to explore ideas that push beyond traditional limits and categories.
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                What to Expect
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Inspiring talks from diverse speakers
                </Typography>
                <Typography component="li" paragraph>
                  Interactive sessions and Q&A opportunities
                </Typography>
                <Typography component="li" paragraph>
                  Networking dinner with speakers and attendees
                </Typography>
                <Typography component="li" paragraph>
                  TEDx merchandise and event materials
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
                <Typography>January 31, 2025</Typography>
                <Typography>9:00 AM - 6:00 PM</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Location
                </Typography>
                <Typography>FRCRCE Auditorium</Typography>
                <Typography>Fr. Conceicao Rodrigues College of Engineering</Typography>
                <Typography>Bandra West, Mumbai</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Registration Fee
                </Typography>
                <Typography>₹500 for students</Typography>
                <Typography>₹1000 for professionals</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/events/tedx/register')}
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

export default TEDxCRCE; 