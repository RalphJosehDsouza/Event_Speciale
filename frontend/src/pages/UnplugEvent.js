import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  Event,
  LocationOn,
  Schedule,
  AttachMoney,
  Group,
  BeachAccess,
  Nightlife,
  Sports,
  EmojiEvents,
  ContactMail,
  ContactPhone,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UnplugEvent = () => {
  const navigate = useNavigate();

  const eventDetails = {
    title: "Unplug 2024",
    description: "A 3-day, 2-night retreat in Alibaug focused on networking, workshops, and startup development.",
    image: "/images/unplug/hero.jpg",
    date: "March 28-30, 2024",
    location: "Alibaug",
    organizer: "GDSC F.R.C.R.C.E.",
    price: "₹3000/person (early bird)",
    priceBreakdown: {
      stay: "₹2100",
      food: "₹900 (unlimited buffet)"
    }
  };

  const itinerary = [
    {
      day: "Day 1",
      activities: ["Arrival", "Barbecue", "Pitch Sessions"]
    },
    {
      day: "Day 2",
      activities: ["Beach Games", "Sunset Snacks", "DJ Night"]
    },
    {
      day: "Day 3",
      activities: ["Investor Rounds", "Bounty Reveal", "Checkout"]
    }
  ];

  const thingsToCarry = [
    { category: "Documents", items: ["College ID", "Aadhaar/PAN"] },
    { category: "Clothing", items: ["Comfortable beachwear", "Sneakers"] },
    { category: "Miscellaneous", items: ["Water bottle", "First-aid kit"] }
  ];

  const contactInfo = [
    { name: "Shaun Mendes", role: "Organizer" },
    { name: "Siddhant Jadhav", role: "Organizer" },
    { name: "Sarah Dayal", role: "Organizer" }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/euphoria.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {eventDetails.title}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Organized by {eventDetails.organizer}
        </Typography>
        <Typography variant="body1" paragraph>
          {eventDetails.description}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Event Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                What to Expect
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <ListItemText
                    primary="Hands-on workshops with investors & MAANG professionals"
                    secondary="Learn from industry experts and network with professionals"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BeachAccess />
                  </ListItemIcon>
                  <ListItemText
                    primary="Beach games and outdoor activities"
                    secondary="Fun and team-building activities by the beach"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Nightlife />
                  </ListItemIcon>
                  <ListItemText
                    primary="DJ night and bonfire"
                    secondary="Unwind and network in a relaxed atmosphere"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <ListItemText
                    primary="Prizes, internships, and mentorship opportunities"
                    secondary="Win exciting prizes and get career opportunities"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Itinerary
              </Typography>
              <Grid container spacing={2}>
                {itinerary.map((day) => (
                  <Grid item xs={12} md={4} key={day.day}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {day.day}
                      </Typography>
                      <List dense>
                        {day.activities.map((activity, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={activity} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Registration Card */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Registration Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText
                    primary="Early Bird Price"
                    secondary={eventDetails.price}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date"
                    secondary={eventDetails.date}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={eventDetails.location}
                  />
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate(`/register/unplug`)}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          {/* Things to Carry */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Things to Carry
              </Typography>
              {thingsToCarry.map((category) => (
                <Box key={category.category} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    {category.category}
                  </Typography>
                  <List dense>
                    {category.items.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <List>
                {contactInfo.map((contact, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ContactMail />
                    </ListItemIcon>
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.role}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UnplugEvent; 