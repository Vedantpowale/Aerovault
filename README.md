<<<<<<< HEAD
# Aerovault Monorepo

This repository is now organized as a clean monorepo with clear frontend/backend separation.

## Project structure

```text
project-root/
├── frontend/            # Next.js app (UI + app route handlers)
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── assets/
│   │   ├── utils/
│   │   └── lib/
│   └── package.json
├── backend/             # Backend scripts/services and future API layering
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── config/
│   └── package.json
├── database/
│   ├── migrations/
│   └── schema/
├── docs/
├── .env / .env.local
└── README.md
```

## Why this layout

- **Frontend** keeps all Next.js runtime code and static assets in one workspace.
- **Backend** isolates operational scripts and provides expansion points for dedicated services.
- **Database** separates migration/schema assets from application code.
- **Docs** stores architecture and maintenance notes.

See `docs/reorganization-notes.md` for move-by-move details.

## Getting started

Install dependencies from the repo root:

```bash
npm install
```

Run frontend dev server:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Run backend bootstrap scripts:

```bash
npm run backend:setup-accounts
npm run backend:seed-roles
```
=======
# AeroVault Monorepo

This repository uses a monorepo layout with a dedicated Next.js frontend and a dedicated Node.js backend.

## Structure

```text
project-root/
├── frontend/                    # Next.js app for Vercel deployment
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── utils/
│   └── package.json
├── backend/                     # Node.js API/services for Node/Supabase deployment
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── scripts/
│   └── package.json
├── database/
│   ├── migrations/
│   └── schema/
├── docs/
└── package.json
```

## Development workflow

- `npm run dev` starts **frontend + backend concurrently**.
- Frontend hot reload is provided by `next dev`.
- Backend hot reload is provided by `nodemon + tsx`.

## Production workflow

- `npm run build` builds frontend and backend.
- `npm run start` starts frontend and backend in production mode.

## Environment validation

Startup scripts run `tooling/validate-env.mjs` to ensure required variables exist:

- `GEMINI_API_KEY`
- `AVIATION_STACK_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Logging and error handling

Backend includes:

- Structured JSON logging (`backend/src/utils/logger.ts`)
- Request logging middleware (`backend/src/middleware/request-logger.ts`)
- Centralized error handling middleware (`backend/src/middleware/error-handler.ts`)

## Deployment notes

### Frontend (Vercel)

- Deploy the `frontend` workspace as a Next.js project.
- Use `npm run build -w frontend` as build command if needed.
- Set required environment variables in Vercel project settings.

### Backend (Node server or Supabase)

- Build: `npm run build -w backend`
- Run: `npm run start -w backend`
- Health check endpoint: `GET /api/health`
- API endpoints:
  - `POST /api/chat`
  - `GET /api/tracker`
>>>>>>> origin/main
