# Adaptive AI Learning Platform

A full-stack learning platform that uses AI to diagnose knowledge gaps, generate personalized courses, and support focused study sessions. Students sign up, complete an initial assessment, and receive adaptive content tailored to their weak areas—with gamification, progress tracking, and study tools in one workspace.

## Features

- **Authentication & onboarding** — Register, log in, choose a role (student, teacher, or self-learner), and select subjects.
- **AI-powered initial assessment** — Gemini generates 10 MCQs per subject; answers are scored by concept to build a skill profile.
- **Weak area analysis** — Surfaces high- and medium-priority concepts with AI-suggested prerequisite topics.
- **Personalized course generation** — Builds a structured course from assessment results, emphasizing weak concepts with modules, resources, and progression.
- **Module lessons** — On-demand AI-generated lesson content in Markdown for each course module.
- **Study mode** — Flashcards, concept mind maps (React Flow), and a Pomodoro timer for focused sessions.
- **Gamification** — XP, levels, badges, and progress visualization.
- **Dashboard** — Course overview, review schedule, and performance charts.

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Framer Motion, Chart.js, React Flow |
| Backend  | Node.js, Express, MongoDB (Mongoose), JWT auth |
| AI       | Google Gemini (`gemini-flash-latest`) |

## Project Structure

```
AI--Adaptive--Learning/
├── backend/
│   ├── server.js                 # Express entry point
│   ├── .env.example              # Environment template
│   └── src/
│       ├── controllers/          # Route handlers
│       ├── middleware/           # JWT auth
│       ├── models/               # Mongoose schemas
│       ├── routes/               # API routes
│       └── utils/                # LLM client, errors
└── frontend/
    ├── index.html
    ├── vite.config.mts           # Dev server + API proxy
    └── src/
        ├── components/           # UI components
        ├── context/              # Auth & progress state
        ├── pages/                # Route pages
        └── services/             # API client
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a cloud connection string
- [Google AI Studio](https://aistudio.google.com/) API key for Gemini

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd AI--Adaptive--Learning
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

| Variable         | Description |
|------------------|-------------|
| `PORT`           | API port (default: `5000`) |
| `MONGO_URI`      | MongoDB connection string |
| `JWT_SECRET`     | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `GEMINI_API_KEY` | Google Gemini API key (required for AI features) |

Start the API:

```bash
npm run dev
```

The server runs at `http://localhost:5000`. Health check: `GET /api/health`.

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Vite proxies `/api` requests to the backend.

### 4. Production build (frontend)

```bash
cd frontend
npm run build
npm run preview
```

Serve the `frontend/dist` output behind your host of choice and point API calls to your deployed backend (update the proxy or `baseURL` in `frontend/src/services/api.js` as needed).

## User Flow

1. **Landing** → Sign up or log in.
2. **Role selection** → Student, teacher, or self-learner.
3. **Subject selection** → Choose learning subjects.
4. **Initial assessment** → AI-generated quiz; submit answers for concept-level scoring.
5. **Dashboard** → View progress, course modules, and charts.
6. **Weak areas** → Review prioritized gaps and prerequisites.
7. **Course** → Browse generated modules and open AI lesson content.
8. **Study mode** → Flashcards, mind map, and Pomodoro timer.
9. **Gamification** → XP, levels, and badges.

## API Overview

All protected routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Log in, receive JWT |
| `GET`  | `/api/user/me` | Current user profile |
| `POST` | `/api/user/select-role` | Set user role |
| `POST` | `/api/user/select-subjects` | Set subjects |
| `GET`  | `/api/assessment/generate?subject=` | Generate quiz (session + questions) |
| `GET`  | `/api/assessment/status` | Whether initial assessment is done |
| `POST` | `/api/assessment/submit` | Submit answers (`sessionId`, `answers`) |
| `GET`  | `/api/analysis/weak-areas` | Weak concepts and prerequisites |
| `POST` | `/api/course/generate` | Generate course from assessment results |
| `GET`  | `/api/course/my-course` | Fetch user's course |
| `POST` | `/api/course/module-content` | Generate lesson for a module |
| `GET`  | `/api/study/generate?subject=` | Flashcards and mind map for a subject |

## Scripts

**Backend** (`backend/`)

| Command       | Description |
|---------------|-------------|
| `npm run dev` | Start API with file watch |
| `npm start`   | Start API (production) |

**Frontend** (`frontend/`)

| Command         | Description |
|-----------------|-------------|
| `npm run dev`   | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint`  | ESLint |
| `npm run format`| Prettier |

## Environment Notes

- **`GEMINI_API_KEY`** is required for assessments, courses, weak-area prerequisites, study materials, and module lessons.
- **`MONGO_URI`** must be set before the server starts; otherwise startup fails with a clear error.
- Do not commit `.env` files; they are listed in `.gitignore`.

## License

This project is private (`"private": true` in package manifests). Add a license file if you intend to open-source or distribute it.
