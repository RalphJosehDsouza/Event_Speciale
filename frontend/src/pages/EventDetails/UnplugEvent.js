import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  EventNote,
  LocationOn,
  AttachMoney,
  BeachAccess,
  Celebration,
  NightsStay,
  Group,
  Assignment,
  Warning,
  Phone,
  Email,
  RestaurantMenu,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const UnplugEvent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scheduleData = [
    {
      day: 'Day 1 (March 28)',
      events: ['Arrival', 'Barbecue', 'Pitch sessions']
    },
    {
      day: 'Day 2 (March 29)',
      events: ['Beach games', 'Sunset snacks', 'DJ night']
    },
    {
      day: 'Day 3 (March 30)',
      events: ['Investor rounds', 'Bounty reveal', 'Checkout']
    }
  ];

  const thingsToCarry = [
    { category: 'Documents', items: ['College ID', 'Aadhaar/PAN'] },
    { category: 'Clothing', items: ['Comfortable beachwear', 'Sneakers'] },
    { category: 'Miscellaneous', items: ['Water bottle', 'First-aid kit'] }
  ];

  const contacts = [
    { name: 'Shaun Mendes', role: 'Organizer' },
    { name: 'Siddhant Jadhav', role: 'Coordinator' },
    { name: 'Sarah Dayal', role: 'Coordinator' }
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        minHeight: '100vh',
        pt: 8,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              mb: 6,
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src="/images/unplug-logo.png"
              alt="Unplug Logo"
              sx={{
                width: '200px',
                height: 'auto',
                mb: 3,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 700,
                mb: 2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              UNPLUG
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontStyle: 'italic',
                mb: 4,
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              by the beach
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              A 3-day, 2-night retreat in Alibaug
            </Typography>
            <Chip
              label="Organized by GDSC F.R.C.R.C.E"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem',
              }}
            />
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* What to Expect */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  What to Expect
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Group color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Hands-on workshops with investors & MAANG professionals" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BeachAccess color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Beach games, bonfires, and DJ night" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Celebration color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Prizes, internships, and mentorship opportunities" />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Schedule */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Schedule
                </Typography>
                {scheduleData.map((day, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {day.day}
                    </Typography>
                    <List dense>
                      {day.events.map((event, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <EventNote color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={event} />
                        </ListItem>
                      ))}
                    </List>
                    {index < scheduleData.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </Grid>

          {/* Costs & Inclusions */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Costs & Inclusions
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Early Bird Price: ₹3000/person"
                      secondary="Includes stay, food, and all perks"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NightsStay color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Stay: ₹2100" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <RestaurantMenu color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Food: ₹900"
                      secondary="Unlimited buffet included"
                    />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Things to Carry */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Things to Carry
                </Typography>
                {thingsToCarry.map((category, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {category.category}
                    </Typography>
                    <List dense>
                      {category.items.map((item, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <Assignment color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    {index < thingsToCarry.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </Grid>

          {/* Terms & Conditions */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Paper
                sx={{
                  p: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Terms & Conditions
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Eligibility: F.R.C.R.C.E. students only" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Strict rules: No alcohol/drugs, no littering" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Non-refundable fee" />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Paper
                sx={{
                  p: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={3}>
                  {contacts.map((contact, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          border: '1px solid',
                          borderColor: 'primary.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h6">{contact.name}</Typography>
                        <Typography color="textSecondary">
                          {contact.role}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            startIcon={<Phone />}
                            variant="outlined"
                            sx={{ mr: 1 }}
                          >
                            Call
                          </Button>
                          <Button startIcon={<Email />} variant="outlined">
                            Email
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Register Button */}
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Register Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UnplugEvent; 