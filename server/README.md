# Best XI — Server

Express backend that serves the unified player pool and static player images.

## Setup

```bash
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

## Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/players/:mode` | Returns players for a mode. `mode === 'world'` returns the entire pool; other values filter by `team`. |
| GET | `/images/:filename` | Static player images (and the bundled `placeholder.svg` fallback). |

## Data

All 70 players live in a single `data/players.json` file, each tagged with a `team` field. Adding a new club mode is a data-only change — no code edits required.
