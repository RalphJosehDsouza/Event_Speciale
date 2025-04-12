import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Box,
  Radio,
  RadioGroup,
  FormLabel,
  Divider,
} from '@mui/material';

const Register = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      branch: '',
    },
    eventSpecific: {},
    payment: {
      method: '',
      agreed: false,
    },
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/events/${eventId}`)
      .then(response => response.json())
      .then(data => {
        setEvent(data);
        // Initialize event-specific fields based on event type
        const specificFields = {};
        if (data.event_type === 'RETREAT') {
          specificFields.roomPreference = '';
          specificFields.dietaryRestrictions = '';
          specificFields.emergencyContact = '';
        } else if (data.event_type === 'CONFERENCE') {
          specificFields.tShirtSize = '';
          specificFields.foodPreference = '';
        }
        setFormData(prev => ({
          ...prev,
          eventSpecific: specificFields,
        }));
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        setError('Failed to load event details');
      });
  }, [eventId]);

  const steps = ['Personal Information', 'Event Details', 'Payment'];

  const handleChange = (section, field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      });
      
      if (response.ok) {
        navigate(`/registration-success/${eventId}`);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Failed to submit registration');
    }
  };

  if (!event) {
    return (
      <Container>
        <Typography variant="h4">Loading registration form...</Typography>
      </Container>
    );
  }

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Full Name"
          value={formData.personalInfo.name}
          onChange={handleChange('personalInfo', 'name')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          value={formData.personalInfo.email}
          onChange={handleChange('personalInfo', 'email')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          value={formData.personalInfo.phone}
          onChange={handleChange('personalInfo', 'phone')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="College"
          value={formData.personalInfo.college}
          onChange={handleChange('personalInfo', 'college')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Year</InputLabel>
          <Select
            value={formData.personalInfo.year}
            onChange={handleChange('personalInfo', 'year')}
            label="Year"
          >
            <MenuItem value="FE">First Year</MenuItem>
            <MenuItem value="SE">Second Year</MenuItem>
            <MenuItem value="TE">Third Year</MenuItem>
            <MenuItem value="BE">Fourth Year</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Branch</InputLabel>
          <Select
            value={formData.personalInfo.branch}
            onChange={handleChange('personalInfo', 'branch')}
            label="Branch"
          >
            <MenuItem value="COMPS">Computer Engineering</MenuItem>
            <MenuItem value="IT">Information Technology</MenuItem>
            <MenuItem value="EXTC">Electronics & Telecommunications</MenuItem>
            <MenuItem value="MECH">Mechanical Engineering</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderEventSpecific = () => {
    if (event.event_type === 'RETREAT') {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Room Preference</FormLabel>
              <RadioGroup
                value={formData.eventSpecific.roomPreference}
                onChange={handleChange('eventSpecific', 'roomPreference')}
              >
                <FormControlLabel value="single" control={<Radio />} label="Single Occupancy" />
                <FormControlLabel value="double" control={<Radio />} label="Double Occupancy" />
                <FormControlLabel value="triple" control={<Radio />} label="Triple Occupancy" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dietary Restrictions"
              multiline
              rows={2}
              value={formData.eventSpecific.dietaryRestrictions}
              onChange={handleChange('eventSpecific', 'dietaryRestrictions')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Emergency Contact"
              value={formData.eventSpecific.emergencyContact}
              onChange={handleChange('eventSpecific', 'emergencyContact')}
            />
          </Grid>
        </Grid>
      );
    } else if (event.event_type === 'CONFERENCE') {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>T-Shirt Size</InputLabel>
              <Select
                value={formData.eventSpecific.tShirtSize}
                onChange={handleChange('eventSpecific', 'tShirtSize')}
                label="T-Shirt Size"
              >
                <MenuItem value="S">Small</MenuItem>
                <MenuItem value="M">Medium</MenuItem>
                <MenuItem value="L">Large</MenuItem>
                <MenuItem value="XL">Extra Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Food Preference</InputLabel>
              <Select
                value={formData.eventSpecific.foodPreference}
                onChange={handleChange('eventSpecific', 'foodPreference')}
                label="Food Preference"
              >
                <MenuItem value="veg">Vegetarian</MenuItem>
                <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
                <MenuItem value="jain">Jain</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
    }
    return null;
  };

  const renderPayment = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Registration Fee: ₹{event.registration_fee}
        </Typography>
        {event.special_offers && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Special Offers:
            </Typography>
            <ul>
              {event.special_offers.map((offer, index) => (
                <li key={index}>{offer}</li>
              ))}
            </ul>
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={formData.payment.method}
            onChange={handleChange('payment', 'method')}
            label="Payment Method"
          >
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="netbanking">Net Banking</MenuItem>
            <MenuItem value="card">Credit/Debit Card</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.payment.agreed}
              onChange={handleChange('payment', 'agreed')}
            />
          }
          label="I agree to the terms and conditions"
        />
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderEventSpecific();
      case 2:
        return renderPayment();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register for {event.title}
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formData.payment.agreed}
              >
                Submit Registration
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register; 