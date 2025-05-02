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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnplugRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      college: '',
      year: '',
      branch: '',
    },
    retreatDetails: {
      emergencyContact: '',
      foodPreference: '',
      roomPreference: '',
      specialRequirements: '',
      medicalConditions: '',
      interests: '',
      agreed: false,
    }
  });
  const [error, setError] = useState('');

  const handleChange = (section, field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    }));
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
          Register for Unplug: By The Beach
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
                value={formData.personalInfo.age}
                onChange={handleChange('personalInfo', 'age')}
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

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Retreat Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Emergency Contact"
                value={formData.retreatDetails.emergencyContact}
                onChange={handleChange('retreatDetails', 'emergencyContact')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Food Preference</InputLabel>
                <Select
                  value={formData.retreatDetails.foodPreference}
                  onChange={handleChange('retreatDetails', 'foodPreference')}
                  label="Food Preference"
                >
                  <MenuItem value="veg">Vegetarian</MenuItem>
                  <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
                  <MenuItem value="jain">Jain</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Room Preference</InputLabel>
                <Select
                  value={formData.retreatDetails.roomPreference}
                  onChange={handleChange('retreatDetails', 'roomPreference')}
                  label="Room Preference"
                >
                  <MenuItem value="single">Single Occupancy (₹500 extra)</MenuItem>
                  <MenuItem value="double">Double Occupancy</MenuItem>
                  <MenuItem value="triple">Triple Occupancy</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requirements"
                multiline
                rows={2}
                value={formData.retreatDetails.specialRequirements}
                onChange={handleChange('retreatDetails', 'specialRequirements')}
                placeholder="Any special requirements or accommodations needed"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Medical Conditions"
                multiline
                rows={2}
                value={formData.retreatDetails.medicalConditions}
                onChange={handleChange('retreatDetails', 'medicalConditions')}
                placeholder="List any medical conditions, allergies, or medications"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interests & Activities"
                multiline
                rows={2}
                value={formData.retreatDetails.interests}
                onChange={handleChange('retreatDetails', 'interests')}
                placeholder="What activities are you most interested in during the retreat?"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.retreatDetails.agreed}
                    onChange={handleChange('retreatDetails', 'agreed')}
                    required
                  />
                }
                label="I understand and agree to follow all retreat guidelines and safety protocols"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!formData.retreatDetails.agreed}
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UnplugRegistration; 