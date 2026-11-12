# GM League

A web platform for running an inter-team sports league: schedules, live match scoring, standings, and player statistics for **cricket**, **volleyball** and **throwball** (men's and women's teams).

## Features

- **Home / Schedule / Matches** – upcoming, live and completed fixtures with match detail pages
- **Leaderboard** – team standings (wins, losses, draws, points; NRR for cricket)
- **Stats & player pages** – per-player aggregates computed from match performances
- **Admin area** (`/admin`) – login, create teams and matches, ball-by-ball cricket scoring and set-based scoring for volleyball/throwball, reset or clear league data

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS, lucide-react icons, Recharts for charts
- Storage: Vercel Postgres (`@vercel/postgres`) when deployed, with a local SQLite fallback (`better-sqlite3`) in development

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Without `POSTGRES_URL` set (and outside Vercel) the app uses a local `gm_league.db` SQLite file, which is git-ignored and seeded with default data on first run. If `better-sqlite3` is not installed, run `npm install better-sqlite3` for local development.

To use Postgres, set `POSTGRES_URL` (see `vercel env pull`) in `.env.local`. Never commit `.env*` files.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
app/            Pages (home, matches, schedule, leaderboard, stats, players, admin) and API routes
app/api/        data (GET/POST league data), reset (restore defaults), clear (delete all)
components/     Navbar, MatchCard, CricketBallScorer
lib/            store.ts (default data + stats logic), db.ts (SQLite/Postgres layer),
                context.tsx (client state + sync), types.ts, validate.ts
```

## API

- `GET /api/data` – full league data (`teams`, `matches`)
- `POST /api/data` – replace league data; the body is validated and rejected with `400` if malformed
- `POST /api/reset` – reset to default data
- `POST /api/clear` – delete all teams, players and matches

## Deployment

Deploys to [Vercel](https://vercel.com); see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
