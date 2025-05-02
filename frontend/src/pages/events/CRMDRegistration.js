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

const CRMDRegistration = () => {
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
    technicalDetails: {
      teamName: '',
      teamSize: '',
      teamMembers: [''],
      preferredLanguage: '',
      technicalSkills: '',
      linkedinProfile: '',
      githubProfile: '',
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
      technicalDetails: {
        ...prev.technicalDetails,
        teamMembers: [...prev.technicalDetails.teamMembers, ''],
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
          Register for CRMD 2024: Maze of Conflict
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
                Technical Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Team Name"
                value={formData.technicalDetails.teamName}
                onChange={handleChange('technicalDetails', 'teamName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Team Size</InputLabel>
                <Select
                  value={formData.technicalDetails.teamSize}
                  onChange={handleChange('technicalDetails', 'teamSize')}
                  label="Team Size"
                >
                  <MenuItem value="2">2 Members</MenuItem>
                  <MenuItem value="3">3 Members</MenuItem>
                  <MenuItem value="4">4 Members</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.technicalDetails.teamMembers.map((member, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  required
                  fullWidth
                  label={`Team Member ${index + 1} Name`}
                  value={member}
                  onChange={handleChange('technicalDetails', 'teamMembers', index)}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={addTeamMember}
                disabled={formData.technicalDetails.teamMembers.length >= 4}
              >
                Add Team Member
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Programming Language</InputLabel>
                <Select
                  value={formData.technicalDetails.preferredLanguage}
                  onChange={handleChange('technicalDetails', 'preferredLanguage')}
                  label="Preferred Programming Language"
                >
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={2}
                label="Technical Skills"
                value={formData.technicalDetails.technicalSkills}
                onChange={handleChange('technicalDetails', 'technicalSkills')}
                placeholder="List your relevant technical skills and experience"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                value={formData.technicalDetails.linkedinProfile}
                onChange={handleChange('technicalDetails', 'linkedinProfile')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GitHub Profile"
                value={formData.technicalDetails.githubProfile}
                onChange={handleChange('technicalDetails', 'githubProfile')}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.technicalDetails.agreed}
                    onChange={handleChange('technicalDetails', 'agreed')}
                    required
                  />
                }
                label="I agree to follow the competition rules and code of conduct"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!formData.technicalDetails.agreed}
            >
              Submit Registration
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CRMDRegistration; 