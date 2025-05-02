import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box, 
  Paper, 
  Grid,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Schedule,
  LocationOn,
  AttachMoney,
  Phone,
  Email,
  Group,
  EmojiEvents,
  School,
  Assignment,
  CalendarToday,
  CheckCircle,
  Backpack,
  Gavel
} from '@mui/icons-material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Special handling for Unplug event
        if (id === 'unplug') {
          setEvent({
            id: 'unplug',
            title: 'Unplug 2024',
            subtitle: 'A 3-day Networking & Startup Retreat',
            description: `Join us for an immersive 3-day, 2-night retreat in Alibaug focused on networking, workshops, and startup development. Organized by GDSC F.R.C.R.C.E., this event brings together students, investors, and MAANG professionals for an unforgettable experience.

            What to Expect:
            • Hands-on workshops with investors & MAANG professionals
            • Pitch sessions and startup development opportunities
            • Beach games and recreational activities
            • Bonfires and DJ night
            • Valuable networking opportunities
            • Prizes, internships, and mentorship opportunities`,
            itinerary: [
              {
                day: 'Day 1 - March 28',
                activities: [
                  'Arrival and check-in',
                  'Welcome barbecue',
                  'Pitch sessions'
                ]
              },
              {
                day: 'Day 2 - March 29',
                activities: [
                  'Beach games and activities',
                  'Sunset snacks',
                  'DJ night and networking'
                ]
              },
              {
                day: 'Day 3 - March 30',
                activities: [
                  'Investor rounds',
                  'Bounty reveal',
                  'Checkout and departure'
                ]
              }
            ],
            highlights: [
              'Exclusive workshops with industry professionals',
              'Beachside networking opportunities',
              'DJ night and bonfire sessions',
              'Pitch sessions with investors',
              'Internship opportunities',
              'Mentorship programs'
            ],
            inclusions: [
              'Accommodation for 2 nights',
              'Unlimited buffet meals',
              'Workshop materials',
              'Access to all activities',
              'Certificate of participation'
            ],
            things_to_carry: [
              'College ID',
              'Aadhaar/PAN Card',
              'Comfortable beachwear',
              'Sneakers',
              'Water bottle',
              'First-aid kit'
            ],
            terms_and_conditions: [
              'Only F.R.C.R.C.E. students are eligible to participate',
              'Strictly no alcohol or drugs allowed',
              'No littering on the premises',
              'Registration fee is non-refundable',
              'Participants must follow all safety guidelines'
            ],
            date: '2024-03-28',
            time: '9:00 AM onwards',
            location: 'Alibaug Beach Resort',
            venue_details: 'Exact location will be shared with registered participants',
            registration_fee: 3000,
            early_bird_text: 'Early bird pricing includes stay, food, and all perks',
            fee_breakdown: {
              stay: 2100,
              food: 900,
              note: 'Unlimited buffet included'
            },
            team_size: 'Individual registration',
            contact_phone: '+91 98765 43210',
            contact_email: 'unplug2024@frcrce.ac.in',
            coordinators: [
              'Shaun Mendes - Event Head',
              'Siddhant Jadhav - Technical Coordinator',
              'Sarah Dayal - Operations Head'
            ],
            image_url: '/images/events/unplug-2024.jpg',
            registration_deadline: '2024-03-20',
            event_type: 'Retreat'
          });
          setLoading(false);
        } else {
          const response = await fetch(`http://localhost:8000/api/events/${id}`);
          const data = await response.json();
          setEvent(data);
        setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Event not found</Typography>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Card 
          sx={{ 
            position: 'relative',
            mb: 4,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
            <CardMedia
              component="img"
              height="400"
              image={event.image_url || '/images/default-event.jpg'}
              alt={event.title}
            sx={{ 
              filter: 'brightness(0.7)',
              objectFit: 'cover'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 4,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: 'white',
            }}
          >
            <Chip
              label={event.event_type}
              color="primary"
              sx={{ mb: 2 }}
            />
            <Typography variant="h2" component="h1" gutterBottom>
                {event.title}
            </Typography>
            {event.subtitle && (
              <Typography variant="h5" sx={{ mb: 2 }}>
                {event.subtitle}
              </Typography>
            )}
              </Box>
        </Card>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'background.paper',
                mb: 4
              }}
            >
              <Typography variant="h5" gutterBottom>About the Event</Typography>
              <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
              {event.description}
              </Typography>

              {event.highlights && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Event Highlights
                  </Typography>
                  <List>
                    {event.highlights.map((highlight, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <EmojiEvents color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={highlight} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {event.itinerary && (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: 'background.paper',
                    mb: 4
                  }}
                >
                  <Typography variant="h5" gutterBottom>Event Itinerary</Typography>
                  <List>
                    {event.itinerary.map((day, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Typography variant="h6" color="primary">
                                {day.day}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {day.activities.map((activity, actIndex) => (
                          <ListItem key={actIndex} sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Assignment color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={activity} />
                          </ListItem>
                        ))}
                        {index < event.itinerary.length - 1 && <Divider sx={{ my: 2 }} />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              )}

              {event.inclusions && (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: 'background.paper',
                    mb: 4
                  }}
                >
                  <Typography variant="h5" gutterBottom>What's Included</Typography>
                  <List>
                    {event.inclusions.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}

              {event.things_to_carry && (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: 'background.paper',
                    mb: 4
                  }}
                >
                  <Typography variant="h5" gutterBottom>Things to Carry</Typography>
                  <List>
                    {event.things_to_carry.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Backpack color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}

              {event.terms_and_conditions && (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: 'background.paper',
                    mb: 4
                  }}
                >
                  <Typography variant="h5" gutterBottom>Terms & Conditions</Typography>
                  <List>
                    {event.terms_and_conditions.map((term, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Gavel color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={term} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Paper>

            {/* Event Details Card */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'background.paper'
              }}
            >
              <Typography variant="h5" gutterBottom>Event Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Date"
                        secondary={formatDate(event.date)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Time"
                        secondary={event.time}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Location"
                        secondary={event.location}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Registration Fee"
                        secondary={`₹${event.registration_fee}`}
                      />
                    </ListItem>
                    {event.team_size && (
                      <ListItem>
                        <ListItemIcon>
                          <Group color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Team Size"
                          secondary={event.team_size}
                        />
                      </ListItem>
                    )}
                    {event.prizes && (
                      <ListItem>
                        <ListItemIcon>
                          <EmojiEvents color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Prizes"
                          secondary={event.prizes}
                        />
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Grid>
            </Paper>
        </Grid>

          {/* Sidebar */}
        <Grid item xs={12} md={4}>
            {/* Registration Card */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'background.paper',
                mb: 4,
                position: 'sticky',
                top: 24
              }}
            >
              <Typography variant="h5" gutterBottom>Registration</Typography>
              {event.registration_deadline && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Registration Deadline
            </Typography>
                  <Typography variant="body1">
                    {formatDate(event.registration_deadline)}
            </Typography>
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate(`/register/${event.id}`)}
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  },
                }}
              >
                Register Now
              </Button>
          </Paper>

            {/* Contact Information */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'background.paper'
              }}
            >
              <Typography variant="h5" gutterBottom>Contact Information</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone"
                    secondary={event.contact_phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email"
                    secondary={event.contact_email}
                  />
                </ListItem>
              </List>

              {event.coordinators && (
                <>
                  <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                    Event Coordinators
              </Typography>
                  <List>
                    {event.coordinators.map((coordinator, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <School color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={coordinator} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default EventDetails; 