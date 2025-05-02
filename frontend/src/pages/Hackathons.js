import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, ArrowForward } from '@mui/icons-material';

const Hackathons = () => {
  const navigate = useNavigate();

  const hackathons = [
    {
      id: 1,
      title: "Bit & Build 2024",
      description: "48-hour coding challenge to build innovative solutions for real-world problems",
      image: "/images/bitnbuild.png",
      date: "April 5-7, 2024",
      category: "Hackathon",
      route: "/events/bitnbuild"
    },
    {
      id: 2,
      title: "Code Wars",
      description: "Competitive programming competition with exciting prizes",
      image: "/images/code-wars.png",
      date: "May 15-16, 2024",
      category: "Competition",
      route: "/events/code-wars"
    },
    {
      id: 3,
      title: "Hack the Future",
      description: "Build solutions for future challenges in AI and ML",
      image: "/images/hack-future.png",
      date: "June 20-22, 2024",
      category: "Hackathon",
      route: "/events/hack-future"
    }
  ];

  const handleLearnMore = (hackathon) => {
    if (hackathon.route) {
      navigate(hackathon.route);
    } else {
      navigate(`/events/${hackathon.id}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Upcoming Hackathons
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Join our exciting hackathons and showcase your coding skills
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {hackathons.map((hackathon, index) => (
          <Grid item xs={12} md={4} key={hackathon.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={hackathon.image}
                  alt={hackathon.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={hackathon.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {hackathon.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {hackathon.description}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {hackathon.date}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handleLearnMore(hackathon)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Hackathons; 