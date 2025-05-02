import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/ClubPage.css';

const ClubPage = () => {
    const { clubName } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clubInfo, setClubInfo] = useState(null);

    useEffect(() => {
        const fetchClubEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/events/club/${clubName}`);
                setEvents(response.data);
                
                // Fetch club information
                const clubResponse = await axios.get(`http://localhost:8000/clubs/${clubName}`);
                setClubInfo(clubResponse.data);
            } catch (err) {
                setError('Failed to fetch club events');
                console.error('Error fetching club events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClubEvents();
    }, [clubName]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>{error}</h2>
                <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
        );
    }

    return (
        <motion.div 
            className="club-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="club-header">
                <h1>{clubInfo?.name || clubName}</h1>
                <p className="club-description">{clubInfo?.description}</p>
            </div>

            <div className="events-grid">
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        className="event-card"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`/events/${event.id}`)}
                    >
                        <img src={event.image_url} alt={event.title} className="event-image" />
                        <div className="event-info">
                            <h3>{event.title}</h3>
                            <p className="event-date">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p className="event-location">{event.location}</p>
                            <p className="event-fee">₹{event.registration_fee}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="no-events">
                    <h2>No events found for this club</h2>
                    <button onClick={() => navigate('/events')}>View All Events</button>
                </div>
            )}
        </motion.div>
    );
};

export default ClubPage; 