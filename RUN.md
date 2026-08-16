# Running Best XI

This project has two parts that run side by side:

- **Backend** — `server/` — Express API on port **5000**
- **Frontend** — `client/` — Vite/React on port **5173**

You'll want **two terminals**, one for each.

---

## One-time setup

### 1. Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/` (optional — defaults work too):

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 2. Frontend

```bash
cd client
npm install
```

No extra config needed — Vite already proxies `/api` and `/images` to `http://localhost:5000` (see `client/vite.config.js`).

---

## Daily run

### Terminal 1 — start the backend

```bash
cd server
npm run dev          # nodemon — auto-restarts on file changes
# or
npm start            # plain node — no auto-reload
```

You should see:

```
Server running on port 5000
```

Test it:

```bash
curl http://localhost:5000/api/players/real-madrid
```

### Terminal 2 — start the frontend

```bash
cd client
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

Open <http://localhost:5173> in your browser.

---

## Other useful commands

### Frontend

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Start Vite dev server with HMR on `:5173`     |
| `npm run build`  | Produce a production build in `client/dist/`  |
| `npm run preview`| Serve the production build locally for testing |

### Backend

| Command        | What it does                                          |
| -------------- | ----------------------------------------------------- |
| `npm run dev`  | Start server with `nodemon` (auto-restart on changes) |
| `npm start`    | Start server with plain `node`                        |

---

## Quick checklist

- [ ] Backend terminal shows `Server running on port 5000`
- [ ] Frontend terminal shows `Local: http://localhost:5173/`
- [ ] `curl http://localhost:5000/api/players/real-madrid` returns JSON
- [ ] Browser opens the app and the mode cards render

If the frontend loads but a mode shows "Failed to load players", the backend isn't running (or `CLIENT_URL` in `server/.env` doesn't match the Vite origin).
