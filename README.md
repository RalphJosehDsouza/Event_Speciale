# FRCRCE Events Platform

A modern, interactive platform for managing and showcasing events at Father Conceicao Rodrigues College of Engineering (FRCRCE), Bandra.

## Features

- 🎯 Modern, Nike-like UI with smooth animations
- 📱 Fully responsive design
- 🔍 Advanced event search and filtering
- 🏃‍♂️ Special hackathons section with rotating showcase
- 🎨 Club-specific event pages
- 📅 Event registration system
- 📊 Real-time event updates
- 🎫 Ticket management
- 📸 Image gallery for events

## Tech Stack

### Frontend
- React.js
- Material-UI
- Framer Motion
- React Router
- Axios

### Backend
- FastAPI
- MongoDB
- Python
- Motor (async MongoDB driver)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/frcrce-events.git
cd frcrce-events
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=frcrce_events
```

5. Start the backend server:
```bash
cd backend
uvicorn app.main:app --reload
```

6. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Project Structure

```
frcrce-events/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── static/
│   └── requirements.txt
└── README.md
```

## Available Scripts

### Frontend
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run lint`: Run linter

### Backend
- `python seed.py`: Seed the database with sample data
- `python -m pytest`: Run tests
- `uvicorn app.main:app --reload`: Start development server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or suggestions, please contact:
- Email: events@frcrce.ac.in
- Website: https://frcrce.ac.in 