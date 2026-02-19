# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Conjugito (branded as "Hablito") is a Spanish verb conjugation practice app. Frontend hosted on Vercel, backend on Railway.app with a Railway PostgreSQL database.

## Commands

### Frontend (hablito/)
```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Content site (content/)
```bash
npm run dev      # Start Astro dev server (localhost:4321)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

### Backend (backend/)
```bash
npm run dev      # Start with nodemon (localhost:3001)
npm start        # Production start
```

### Development Setup
The frontend proxies `/api` requests to `http://localhost:3001` via Vite config — no need to change API URLs for local dev. Copy `hablito/.env.example` to `hablito/.env` and `backend/.env.example` to `backend/.env`.

## Architecture

### Stack
- **Frontend** (`hablito/`): React 18 + Vite, Material-UI v5, Axios
- **Content site** (`content/`): Astro 4 + MDX — static SEO pages at `/learn/*`
- **Backend**: Express 4, Sequelize v6 ORM, PostgreSQL
- **Deployment**: Frontend + Content → Vercel (separate projects, same domain via rewrites), Backend → Railway

### Frontend Structure (`hablito/src/`)
The app is a single-screen practice interface. `App.jsx` wraps everything in an MUI ThemeProvider. The main screen is `ConjugationPracticeScreen.jsx`, which orchestrates:
- `VerbConjugator.jsx` — the practice input/feedback component
- `SettingsSidebar.jsx` — tray for toggling tenses and verb filters
- `VerbsScreen.jsx` — side tray listing all verbs

API calls live in `api/`, the Axios instance is in `http-common.jsx` (reads `VITE_API_URL`). User identity is managed in `cookies/handleUserIdCookies.jsx`.

### Backend Structure (`backend/`)
- `server.js` — Express entry point, CORS config, health endpoint
- `models/` — 24 Sequelize models: one per Spanish tense + `Verb.js` + `user_practice_settings.js`
- `routes/` — `verbRoutes.js`, `tenseRoutes.js`, `settingRoutes.js`
- `controllers/` — corresponding controller files

### Database Models
- **Verb**: `infinitive` (PK), `gerund`, `pastParticiple`, `irregular`, `reflexive`, `common`, `englishInfinitive`
- **[TenseName]** (24 models): `infinitive` (FK), plus `yo`, `tu`, `el`, `nosotros`, `vosotros`, `ellos` conjugation columns
- **user_practice_settings**: `user_id` (PK), boolean flags for each of 25+ tenses, verb type filters (`showIrregularVerbs`, `showReflexiveVerbs`, `show_common_verbs`, etc.), `usevosotros`

### User Identity
No authentication. Users get a cookie-based anonymous ID (last 9 digits of timestamp) generated on first visit. Settings are auto-created in the DB on first 404 from settings fetch.

### Key API Routes
- `POST /api/randomverb` — random verb with user filter params in body
- `POST /api/conjugation` — get conjugation for verb/tense/form
- `GET /api/userpracticesettings/:userId`
- `POST /api/createuserpracticesettings/:userId`
- `POST /api/updateuserpracticesettings/:userId`
- `GET /health` — Railway health check

### Content Site Structure (`content/src/`)
- `pages/learn/index.astro` — hub page listing all articles
- `pages/learn/[slug].astro` — dynamic article pages (SSG)
- `content/learn/*.mdx` — article files (frontmatter: title, description, pubDate, tags, relatedVerbs)
- `layouts/LearnLayout.astro` — article page layout with SEO head, nav, schema markup
- `components/AppCTA.astro` — "Practice in Conjugito" call-to-action
- `components/ArticleCard.astro` — card for hub page

**Deployment**: Deploy `content/` as a separate Vercel project. Then update `hablito/vercel.json` — replace `CONTENT_APP_VERCEL_URL` with the deployed URL to route `/learn/*` traffic there.

### Environment Variables
**Frontend** (`hablito/.env`): `VITE_API_URL`
**Backend** (`backend/.env`): `DATABASE_URL` (Railway format), `FRONTEND_URL`, `PORT`

Database config (`backend/config/config.js`) supports both `DATABASE_URL` (Railway) and individual credential env vars for local dev.
