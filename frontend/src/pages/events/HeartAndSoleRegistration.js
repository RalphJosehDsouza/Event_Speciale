import React, { useState } from 'react';
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
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeartAndSoleRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      emergencyContact: '',
    },
    raceDetails: {
      category: '',
      tShirtSize: '',
      previousExperience: '',
      medicalConditions: '',
    }
  });
  const [error, setError] = useState('');

  const handleChange = (section, field) => (event) => {
    if (field === 'age') {
      const age = parseInt(event.target.value);
      if (age < 16 || age > 60) {
        setError('Age must be between 16 and 60 years');
        return;
      }
      setError('');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: event.target.value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: event.target.value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here we'll add the API call to submit registration
      console.log('Form submitted:', formData);
      navigate('/registration-success');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register for Heart & Sole Run 2025
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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
                inputProps={{ min: 16, max: 60 }}
                value={formData.personalInfo.age}
                onChange={handleChange('personalInfo', 'age')}
                error={error.includes('Age must be')}
                helperText={error.includes('Age must be') ? error : ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.personalInfo.gender}
                  onChange={handleChange('personalInfo', 'gender')}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Emergency Contact"
                value={formData.personalInfo.emergencyContact}
                onChange={handleChange('personalInfo', 'emergencyContact')}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Race Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Race Category</InputLabel>
                <Select
                  value={formData.raceDetails.category}
                  onChange={handleChange('raceDetails', 'category')}
                  label="Race Category"
                >
                  <MenuItem value="21k">21K Half Marathon - ₹1000</MenuItem>
                  <MenuItem value="10k">10K Run - ₹800</MenuItem>
                  <MenuItem value="5k">5K Fun Run - ₹500</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>T-Shirt Size</InputLabel>
                <Select
                  value={formData.raceDetails.tShirtSize}
                  onChange={handleChange('raceDetails', 'tShirtSize')}
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
                fullWidth
                label="Previous Running Experience"
                multiline
                rows={2}
                value={formData.raceDetails.previousExperience}
                onChange={handleChange('raceDetails', 'previousExperience')}
                placeholder="Please mention any previous marathons or running events you've participated in"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical Conditions"
                multiline
                rows={2}
                value={formData.raceDetails.medicalConditions}
                onChange={handleChange('raceDetails', 'medicalConditions')}
                placeholder="Please mention any medical conditions or allergies we should be aware of"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default HeartAndSoleRegistration; 