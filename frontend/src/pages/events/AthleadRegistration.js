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

const AthleadRegistration = () => {
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
    sportsDetails: {
      category: '',
      events: [],
      tShirtSize: '',
      emergencyContact: '',
      medicalConditions: '',
      previousExperience: '',
      agreed: false,
    }
  });
  const [error, setError] = useState('');

  const handleChange = (section, field) => (event) => {
    if (field === 'events') {
      setFormData(prev => ({
        ...prev,
        sportsDetails: {
          ...prev.sportsDetails,
          events: Array.isArray(event.target.value) ? event.target.value : [],
        },
      }));
    } else if (field === 'age') {
      const age = parseInt(event.target.value);
      if (age < 16 || age > 30) {
        setError('Age must be between 16 and 30 years');
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
          [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sportsDetails.agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }
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
          Register for Athlead 2024
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
                inputProps={{ min: 16, max: 30 }}
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
                Sports Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.sportsDetails.category}
                  onChange={handleChange('sportsDetails', 'category')}
                  label="Category"
                >
                  <MenuItem value="individual">Individual Sports</MenuItem>
                  <MenuItem value="team">Team Sports</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Events</InputLabel>
                <Select
                  multiple
                  value={formData.sportsDetails.events}
                  onChange={handleChange('sportsDetails', 'events')}
                  label="Events"
                >
                  <MenuItem value="cricket">Cricket</MenuItem>
                  <MenuItem value="football">Football</MenuItem>
                  <MenuItem value="basketball">Basketball</MenuItem>
                  <MenuItem value="volleyball">Volleyball</MenuItem>
                  <MenuItem value="athletics">Athletics</MenuItem>
                  <MenuItem value="badminton">Badminton</MenuItem>
                  <MenuItem value="tabletennis">Table Tennis</MenuItem>
                  <MenuItem value="chess">Chess</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>T-Shirt Size</InputLabel>
                <Select
                  value={formData.sportsDetails.tShirtSize}
                  onChange={handleChange('sportsDetails', 'tShirtSize')}
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
              <TextField
                required
                fullWidth
                label="Emergency Contact"
                value={formData.sportsDetails.emergencyContact}
                onChange={handleChange('sportsDetails', 'emergencyContact')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical Conditions"
                multiline
                rows={2}
                value={formData.sportsDetails.medicalConditions}
                onChange={handleChange('sportsDetails', 'medicalConditions')}
                placeholder="Please mention any medical conditions or allergies we should be aware of"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Previous Sports Experience"
                multiline
                rows={2}
                value={formData.sportsDetails.previousExperience}
                onChange={handleChange('sportsDetails', 'previousExperience')}
                placeholder="Please mention any previous sports events or competitions you've participated in"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.sportsDetails.agreed}
                    onChange={handleChange('sportsDetails', 'agreed')}
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions and confirm that all information provided is accurate"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!formData.sportsDetails.agreed}
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AthleadRegistration; 