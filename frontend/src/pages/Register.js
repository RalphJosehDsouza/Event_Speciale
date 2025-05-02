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
} from '@mui/material';
import axios from 'axios';

const EVENT_DATA = {
  'tedx-spectrum-2025': {
    id: 'tedx-spectrum-2025',
    title: 'TEDxCRCE 2025: Beyond the Spectrum',
    event_type: 'CONFERENCE',
    registration_fee: 500,
  },
  'bitnbuild-2024': {
    id: 'bitnbuild-2024',
    title: 'Bit N Build: Maharashtra Round',
    event_type: 'HACKATHON',
    registration_fee: 200,
  },
  'heart-and-sole-2024': {
    id: 'heart-and-sole-2024',
    title: 'The Heart & Sole Run 2025',
    event_type: 'SPORTS',
    registration_fee: 500,
  },
  'footslog-2024': {
    id: 'footslog-2024',
    title: 'Footslog: Kothaligad Trek',
    event_type: 'RETREAT',
    registration_fee: 800,
  },
  'athlead-2024': {
    id: 'athlead-2024',
    title: 'Athlead 2024',
    event_type: 'SPORTS',
    registration_fee: 100,
  },
  'crmd-2024': {
    id: 'crmd-2024',
    title: 'CRMD 2024: Maze of Conflict',
    event_type: 'TECHNICAL',
    registration_fee: 300,
  },
  'unplug-2024': {
    id: 'unplug-2024',
    title: 'Unplug: By The Beach',
    event_type: 'RETREAT',
    registration_fee: 200,
  },
  'hackx-2024': {
    id: 'hackx-2024',
    title: 'HackX: AI Innovation Challenge',
    event_type: 'HACKATHON',
    registration_fee: 300,
  },
  'codequest-2024': {
    id: 'codequest-2024',
    title: 'CodeQuest 2024',
    event_type: 'HACKATHON',
    registration_fee: 250,
  }
};

const Register = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(EVENT_DATA[eventId] || null);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      age: '',
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeEvent = async () => {
      try {
        if (!event) {
          const response = await fetch(`http://localhost:8000/events/${eventId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch event details');
          }
          const data = await response.json();
        setEvent(data);
        }
        
        const specificFields = {};
        if (event?.event_type === 'RETREAT') {
          specificFields.roomPreference = '';
          specificFields.dietaryRestrictions = '';
          specificFields.emergencyContact = '';
        } else if (event?.event_type === 'CONFERENCE') {
          specificFields.tShirtSize = '';
          specificFields.foodPreference = '';
        } else if (event?.event_type === 'HACKATHON') {
          specificFields.teamName = '';
          specificFields.teamSize = '';
          specificFields.projectIdea = '';
          specificFields.techStack = '';
        } else if (event?.event_type === 'SPORTS') {
          specificFields.category = '';
          specificFields.tShirtSize = '';
          specificFields.emergencyContact = '';
        }
        
        setFormData(prev => ({
          ...prev,
          eventSpecific: specificFields,
        }));
      } catch (err) {
        setError(err.message || 'Failed to load event details');
      }
    };

    if (eventId) {
      initializeEvent();
    }
  }, [eventId, event]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (section, field) => (event) => {
    if (field === 'age') {
      const age = parseInt(event.target.value);
      if (age < 16 || age > 30) {
        setError('Age must be between 16 and 30 years');
        return;
      }
      setError('');
    }
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

  const initializePayment = async (orderId) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: event.registration_fee * 100,
      currency: 'INR',
      name: 'FRCRCE Events',
      description: `Registration for ${event.title}`,
      order_id: orderId,
      handler: async (response) => {
        try {
          const { data } = await axios.post('/api/payments/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            registration_id: orderId
          });
          if (data.success) {
            navigate('/registration-success', { 
              state: { 
                eventTitle: event.title,
                paymentId: response.razorpay_payment_id 
              }
            });
          }
        } catch (error) {
          setError('Payment verification failed. Please contact support.');
          setLoading(false);
        }
      },
      prefill: {
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
        contact: formData.personalInfo.phone
      },
      theme: {
        color: '#3f51b5'
      }
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const registrationData = {
        eventId: event._id,
        personalInfo: formData.personalInfo,
        eventSpecific: formData.eventSpecific
      };

      const { data: registration } = await axios.post('/api/registrations', registrationData);
      const { data: paymentOrder } = await axios.post('/api/payments/create', {
        registrationId: registration._id,
        amount: event.registration_fee
      });

      await initializePayment(paymentOrder.id);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
  }
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
      </Grid>

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
          label="Age"
          type="number"
          inputProps={{ min: 16, max: 30 }}
          value={formData.personalInfo.age}
          onChange={handleChange('personalInfo', 'age')}
          error={error.includes('Age must be')}
          helperText={error.includes('Age must be') ? error : ''}
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
    if (!event) return null;

    switch (event.event_type) {
      case 'RETREAT':
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Retreat Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Room Preference</InputLabel>
                <Select
                value={formData.eventSpecific.roomPreference}
                onChange={handleChange('eventSpecific', 'roomPreference')}
                  label="Room Preference"
                >
                  <MenuItem value="single">Single Room</MenuItem>
                  <MenuItem value="double">Double Room</MenuItem>
                  <MenuItem value="dorm">Dormitory</MenuItem>
                </Select>
            </FormControl>
          </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Dietary Restrictions</InputLabel>
                <Select
              value={formData.eventSpecific.dietaryRestrictions}
              onChange={handleChange('eventSpecific', 'dietaryRestrictions')}
                  label="Dietary Restrictions"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="vegan">Vegan</MenuItem>
                  <MenuItem value="gluten-free">Gluten Free</MenuItem>
                </Select>
              </FormControl>
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

      case 'CONFERENCE':
      return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Conference Details
              </Typography>
            </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>T-Shirt Size</InputLabel>
              <Select
                value={formData.eventSpecific.tShirtSize}
                onChange={handleChange('eventSpecific', 'tShirtSize')}
                label="T-Shirt Size"
              >
                  <MenuItem value="XS">XS</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
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
                  <MenuItem value="vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );

      case 'HACKATHON':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Team Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Team Name"
                value={formData.eventSpecific.teamName}
                onChange={handleChange('eventSpecific', 'teamName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Team Size</InputLabel>
                <Select
                  value={formData.eventSpecific.teamSize}
                  onChange={handleChange('eventSpecific', 'teamSize')}
                  label="Team Size"
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Project Idea"
                multiline
                rows={3}
                value={formData.eventSpecific.projectIdea}
                onChange={handleChange('eventSpecific', 'projectIdea')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Tech Stack"
                value={formData.eventSpecific.techStack}
                onChange={handleChange('eventSpecific', 'techStack')}
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </Grid>
          </Grid>
        );

      case 'SPORTS':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Sports Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.eventSpecific.category}
                  onChange={handleChange('eventSpecific', 'category')}
                  label="Category"
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="team">Team</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>T-Shirt Size</InputLabel>
                <Select
                  value={formData.eventSpecific.tShirtSize}
                  onChange={handleChange('eventSpecific', 'tShirtSize')}
                  label="T-Shirt Size"
                >
                  <MenuItem value="XS">XS</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
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

      default:
        return null;
    }
  };

  const renderPayment = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Registration Fee: ₹{event?.registration_fee || 0}
            </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup
            value={formData.payment.method}
            onChange={handleChange('payment', 'method')}
          >
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
            <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.payment.agreed}
              onChange={handleChange('payment', 'agreed')}
              color="primary"
            />
          }
          label="I agree to the terms and conditions and confirm that all information provided is accurate"
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
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register for {event?.title || 'Event'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Personal Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Event Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>

        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
                Back
              </Button>
            <Box>
              {activeStep === 2 ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                  disabled={!formData.payment.agreed || loading}
              >
                  {loading ? 'Processing...' : 'Submit Registration'}
              </Button>
            ) : (
              <Button
                variant="contained"
                  color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register; 