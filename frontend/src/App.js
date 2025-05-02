import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Hackathons from './pages/Hackathons';
import TEDxCRCE from './pages/events/TEDxCRCE';
import TEDxRegistration from './pages/events/TEDxRegistration';
import BitNBuild from './pages/events/BitNBuild';
import BitNBuildRegistration from './pages/events/BitNBuildRegistration';
import HeartAndSoleRun from './pages/events/HeartAndSoleRun';
import HeartAndSoleRegistration from './pages/events/HeartAndSoleRegistration';
import Footslog from './pages/events/Footslog';
import FootslogRegistration from './pages/events/FootslogRegistration';
import Athlead from './pages/events/Athlead';
import AthleadRegistration from './pages/events/AthleadRegistration';
import CRMD from './pages/events/CRMD';
import Unplug from './pages/events/Unplug';
import UnplugRegistration from './pages/events/UnplugRegistration';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import theme from './theme';
import ClubPage from './pages/ClubPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: '64px', // Height of navbar
              minHeight: '100vh',
              backgroundColor: '#f5f5f5',
            }}
          >
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/club/:clubId" element={<ClubPage />} />
            <Route path="/register/:eventId" element={<Register />} />
              <Route path="/hackathons" element={<Hackathons />} />
              <Route path="/events/tedx" element={<TEDxCRCE />} />
              <Route path="/events/tedx/register" element={<TEDxRegistration />} />
              <Route path="/events/bitnbuild" element={<BitNBuild />} />
              <Route path="/events/bitnbuild/register" element={<BitNBuildRegistration />} />
              <Route path="/events/heart-and-sole" element={<HeartAndSoleRun />} />
              <Route path="/events/heart-and-sole/register" element={<HeartAndSoleRegistration />} />
              <Route path="/events/footslog" element={<Footslog />} />
              <Route path="/events/footslog/register" element={<FootslogRegistration />} />
              <Route path="/events/athlead" element={<Athlead />} />
              <Route path="/events/athlead/register" element={<AthleadRegistration />} />
              <Route path="/events/crmd" element={<CRMD />} />
              <Route path="/events/unplug" element={<Unplug />} />
              <Route path="/events/unplug/register" element={<UnplugRegistration />} />
          </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 