# Personal Expense Tracker & Budget Dashboard

A simple, full-stack web application, It features a React frontend and an Express/Mongoose backend, designed to be containerized and run through a CI/CD pipeline.

## Repository Structure
- `frontend/` - React frontend (Vite, React Router v6, Tailwind CSS, Recharts)
- `backend/` - Node.js backend (Express, Mongoose, JWT)

## Setup Instructions
1. Clone the repository.
2. In the `backend` directory, copy `.env.example` to `.env` and fill in the values.
3. In the `frontend` directory, copy `.env.example` to `.env` and fill in the values.
4. Run `npm install` in both `frontend` and `backend` directories.

## Running with Docker Compose
1. Install Docker Desktop (or Docker Engine with the Compose plugin).
2. From the repository root, run `docker compose up --build`.
3. Open the frontend at `http://localhost:5173`; the API is available at `http://localhost:5000`.

Compose starts MongoDB, waits for it to become healthy before starting the backend, and persists database data in the `mongo_data` volume. The frontend and backend run in development mode with source changes mounted for live reload. The default JWT secret is for local development only; set `JWT_SECRET` in a root `.env` file before using the stack in any shared or deployed environment. Override the host ports with `CLIENT_PORT` and `SERVER_PORT` if needed.

## Running Locally
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Available Scripts

### Backend (`backend/`)
- `npm run dev`: Start the server in development mode.
- `npm start`: Start the server in production mode.
- `npm test`: Run backend tests.
- `npm run lint`: Run ESLint.
- `npm run seed`: Seed the database with demo users and expenses.

### Frontend (`frontend/`)
- `npm run dev`: Start the Vite development server.
- `npm run build`: Build the frontend for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## API Endpoints (Prefix: `/api`)
- `GET /health` - Check health status
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile
- `GET /expenses` - List expenses with filters and pagination
- `POST /expenses` - Create an expense
- `PUT /expenses/:id` - Update an expense
- `DELETE /expenses/:id` - Delete an expense
- `GET /expenses/summary` - Get expense summary for a month
- `GET /expenses/trend` - Get expense trend for last N months
- `GET /budget` - Get budget for a month
- `PUT /budget` - Set or update budget for a month
