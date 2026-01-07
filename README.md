# TeamTrack Backend

Production-ready backend API for TeamTrack  
(Node.js, Express, MongoDB)

## Features
- JWT authentication (access + refresh)
- Role-based access control
- Organizations, projects, tasks, comments
- Business-rule enforcement
- Centralized error handling
- Logging & request tracing
- Unit tests
- Docker support

## Tech Stack
- Node.js (ESM)
- Express
- MongoDB + Mongoose
- JWT
- Joi
- Jest
- Docker

## Architecture
Client → API → MongoDB  
Auth & RBAC enforced at service layer

## Setup

```bash
npm install
cp .env.example .env
npm run dev
