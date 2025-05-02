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

const BitNBuildRegistration = () => {
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
    teamDetails: {
      teamName: '',
      teamSize: '',
      teamMembers: [''],
      projectTheme: '',
      projectIdea: '',
      techStack: '',
      githubProfiles: [''],
      agreed: false,
    }
  });
  const [error, setError] = useState('');

  const handleChange = (section, field, index) => (event) => {
    if (Array.isArray(formData[section][field])) {
      const newArray = [...formData[section][field]];
      newArray[index] = event.target.value;
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
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

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamDetails: {
        ...prev.teamDetails,
        teamMembers: [...prev.teamDetails.teamMembers, ''],
        githubProfiles: [...prev.teamDetails.githubProfiles, ''],
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
          Register for Bit N Build: Maharashtra Round
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
                Team Leader Information
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
                Team Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Team Name"
                value={formData.teamDetails.teamName}
                onChange={handleChange('teamDetails', 'teamName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Team Size</InputLabel>
                <Select
                  value={formData.teamDetails.teamSize}
                  onChange={handleChange('teamDetails', 'teamSize')}
                  label="Team Size"
                >
                  <MenuItem value="2">2 Members</MenuItem>
                  <MenuItem value="3">3 Members</MenuItem>
                  <MenuItem value="4">4 Members</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.teamDetails.teamMembers.map((member, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label={`Team Member ${index + 1} Name`}
                      value={member}
                      onChange={handleChange('teamDetails', 'teamMembers', index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label={`GitHub Profile ${index + 1}`}
                      value={formData.teamDetails.githubProfiles[index]}
                      onChange={handleChange('teamDetails', 'githubProfiles', index)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={addTeamMember}
                disabled={formData.teamDetails.teamMembers.length >= 4}
              >
                Add Team Member
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Project Theme</InputLabel>
                <Select
                  value={formData.teamDetails.projectTheme}
                  onChange={handleChange('teamDetails', 'projectTheme')}
                  label="Project Theme"
                >
                  <MenuItem value="ai">AI/ML</MenuItem>
                  <MenuItem value="blockchain">Blockchain</MenuItem>
                  <MenuItem value="iot">IoT</MenuItem>
                  <MenuItem value="web3">Web3</MenuItem>
                  <MenuItem value="open">Open Innovation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Project Idea"
                value={formData.teamDetails.projectIdea}
                onChange={handleChange('teamDetails', 'projectIdea')}
                placeholder="Describe your project idea and its potential impact"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Tech Stack"
                value={formData.teamDetails.techStack}
                onChange={handleChange('teamDetails', 'techStack')}
                placeholder="List the technologies you plan to use"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.teamDetails.agreed}
                    onChange={handleChange('teamDetails', 'agreed')}
                    required
                  />
                }
                label="I agree to the hackathon rules and code of conduct"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!formData.teamDetails.agreed}
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BitNBuildRegistration; 