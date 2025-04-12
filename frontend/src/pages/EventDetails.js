import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {
  Schedule,
  LocationOn,
  AttachMoney,
  EventNote,
  Info,
  CheckCircle,
  ExpandMore,
  LocalOffer,
  Phone,
  Email,
} from '@mui/icons-material';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={event.image_url || '/images/default-event.jpg'}
              alt={event.title}
            />
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {event.title}
            </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={event.category} color="primary" />
                <Chip label={event.location} variant="outlined" />
              </Box>
              <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Event Schedule
              </Typography>
                    <Timeline>
                {event.schedule?.map((item, index) => (
                  <TimelineItem key={index}>
                          <TimelineSeparator>
                            <TimelineDot color="primary" />
                      {index < event.schedule.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                      <Typography variant="subtitle1">{item.time}</Typography>
                      <Typography variant="body2">{item.activity}</Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Date: {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Time: {new Date(event.date).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Location: {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Registration Deadline: {new Date(event.registration_deadline).toLocaleDateString()}
            </Typography>
              <Button
                variant="contained"
                fullWidth
              onClick={() => navigate(`/register/${id}`)}
              disabled={new Date() > new Date(event.registration_deadline)}
              >
                Register Now
              </Button>
          </Paper>
          {event.rules && event.rules.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rules
              </Typography>
              <ul>
                {event.rules.map((rule, index) => (
                  <li key={index}>
                    <Typography variant="body2">{rule}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails; 