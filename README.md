# Best XI — Football Squad Builder

A two-tier web game where you pick a mode (one of five clubs or World XI) and build an 11-slot starting lineup by locking in players from a live, per-slot shuffling pool.

- **Frontend:** React + Vite (`/client`)
- **Backend:** Express, static JSON, no DB (`/server`)

## Quick start

Two terminals:

```bash
# 1) Backend
cd server
npm install
npm run dev          # http://localhost:5000

# 2) Frontend
cd client
npm install
npm run dev          # http://localhost:5173
```

Visit `http://localhost:5173`. The Vite dev server proxies `/api/*` and `/images/*` to the backend, so no CORS or hardcoded hostnames are required during development.

## How to play

1. Choose a mode — Real Madrid, Arsenal, Manchester United, Barcelona, AC Milan, or World XI.
2. Each of the 11 formation slots independently cycles through eligible players from the shared pool.
3. Click any open slot to lock in the player currently shown there. That player is removed from the shared pool, so the other open slots' next tick excludes them.
4. When all 11 slots are locked, your final XI is shown on the pitch. Use **Play Again** to retry with the same mode, or **Choose Mode** to switch.

## Project structure

```
best-xi/
├── server/
│   ├── server.js               # Express bootstrap
│   ├── routes/players.js       # GET /api/players/:mode
│   ├── data/players.json       # 70-player unified pool
│   ├── public/images/          # static images + placeholder.svg
│   └── .env                    # PORT, CLIENT_URL
└── client/
    ├── src/
    │   ├── App.jsx             # top-level state machine
    │   ├── components/
    │   │   ├── ModeSelectScreen.jsx
    │   │   ├── GameScreen.jsx
    │   │   ├── Pitch.jsx
    │   │   ├── Slot.jsx
    │   │   └── ResultScreen.jsx
    │   ├── config/formations.js # formation + mode definitions
    │   ├── hooks/useShuffle.js  # per-slot interval logic
    │   ├── styles.css
    │   └── main.jsx
    ├── vite.config.js          # dev proxy to Express
    └── index.html
```

## Adding a club

Add entries to `server/data/players.json` with a new `team` value and add the mode in `client/src/config/formations.js`. No backend code changes required — `GET /api/players/:mode` filters by the `team` field, and World XI returns the entire array unfiltered.
