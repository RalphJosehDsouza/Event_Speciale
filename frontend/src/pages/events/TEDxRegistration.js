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

const TEDxRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      branch: '',
    },
    conferenceDetails: {
      tShirtSize: '',
      foodPreference: '',
      attendanceType: '',
      specialRequirements: '',
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
          Register for TEDxCRCE 2025: Beyond the Spectrum
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
                Conference Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>T-Shirt Size</InputLabel>
                <Select
                  value={formData.conferenceDetails.tShirtSize}
                  onChange={handleChange('conferenceDetails', 'tShirtSize')}
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
                  value={formData.conferenceDetails.foodPreference}
                  onChange={handleChange('conferenceDetails', 'foodPreference')}
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
                <InputLabel>Attendance Type</InputLabel>
                <Select
                  value={formData.conferenceDetails.attendanceType}
                  onChange={handleChange('conferenceDetails', 'attendanceType')}
                  label="Attendance Type"
                >
                  <MenuItem value="regular">Regular Pass - ₹500</MenuItem>
                  <MenuItem value="early">Early Bird Pass - ₹400</MenuItem>
                  <MenuItem value="group">Group Pass (5+ people) - ₹450/person</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requirements"
                multiline
                rows={2}
                value={formData.conferenceDetails.specialRequirements}
                onChange={handleChange('conferenceDetails', 'specialRequirements')}
                placeholder="Any special requirements or accommodations needed"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Areas of Interest"
                multiline
                rows={2}
                value={formData.conferenceDetails.interests}
                onChange={handleChange('conferenceDetails', 'interests')}
                placeholder="What topics interest you the most? This helps us tailor the experience."
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.conferenceDetails.agreed}
                    onChange={handleChange('conferenceDetails', 'agreed')}
                    required
                  />
                }
                label="I agree to the terms and conditions and photo/video release policy"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!formData.conferenceDetails.agreed}
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TEDxRegistration; 