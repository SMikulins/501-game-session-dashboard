# Game Session Dashboard

A full-stack React application that displays game sessions, player scores, match history, and game videos.

## Tech Stack

**Frontend:** React, Vite, JavaScript, Tailwind CSS

**Backend:** Node.js, Express

**Database:** SQLite

## Features

- View all game sessions
- Display session details (ID, status, players, scores, photos)
- Update player scores (+1 / −1)
- Match history with session selection
- Video playback for each session
- Responsive layout
- Polling every 5 seconds to simulate real-time updates

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sessions` | Returns all sessions |
| GET | `/sessions/:id` | Returns a session with its players |
| POST | `/sessions` | Creates a new session |
| PATCH | `/sessions/:id` | Updates session status (`active` / `completed`) |
| PATCH | `/sessions/:id/players/:playerId` | Updates a player's score |

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on http://localhost:5001

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173

### Reset database

Delete `backend/game.db` and restart the backend to re-seed with the default 3 sessions.

## Project Structure

```
game-session-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── public/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   └── app.js
└── README.md
```

## Frontend Performance Optimisation

- Components split into reusable modules (`PlayerCard`, `StatusBadge`, `VideoPlayer`, etc.)
- State stored only where needed (selected session, session list)
- API calls centralised in `frontend/src/services/api.js`
- Images use fixed dimensions to reduce layout shift
- Polling refreshes only the selected session, not the full app
- Video element uses `key={videoUrl}` to reload correctly when switching sessions

## Efficient Handling of Images and Video

For this exercise, images and videos are served from the frontend `public/` directory.

In production I would:

- Store media in cloud object storage (S3, Azure Blob, GCS)
- Deliver media through a CDN
- Optimise images with WebP or AVIF and multiple sizes
- Stream videos instead of serving large files directly
- Lazy-load images outside the viewport
- Use `preload="metadata"` on video elements to avoid loading full files upfront

## What I Would Do Differently at Scale

- Replace SQLite with PostgreSQL
- Replace polling with WebSockets or Server-Sent Events
- Add Redis caching for session lists
- Containerise with Docker and deploy behind a load balancer
- Store media in cloud storage with a CDN
- Add automated testing, monitoring, and logging
- Use environment variables for configuration
- Split frontend and backend into independent deployments

## Security Considerations

**Already in place:**

- Parameterised SQL queries (SQL injection protection)
- Input validation on score updates (type check, non-negative)
- Input validation on session status updates (`active` / `completed` only)

**For production I would add:**

- Authentication and authorisation
- Rate limiting
- HTTPS everywhere
- Secure HTTP headers (Helmet)
- Restricted CORS (not open to all origins)
- CSRF protection where applicable
- Secure handling of environment variables
- File upload validation
- Logging and monitoring for suspicious activity

## Future Improvements

- WebSocket support for live updates
- Search, filtering, and pagination
- Player statistics and match analytics
- Authentication and admin dashboard
- Unit and integration tests
- Docker and CI/CD pipeline
