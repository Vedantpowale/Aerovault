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
