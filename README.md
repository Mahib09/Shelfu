# Shelfu

I built Shelfu because I was tracking my manga collection in a Google Sheet that kept getting out of hand. It's a full-stack web app where you can log what you own, what you're looking for, and what you're selling — volume by volume.

**Live demo:** https://shelfu.vercel.app

---

## What it looks like

> Add a screenshot or screen recording here showing: search → add to collection → dashboard update

---

## How it's built

```
Browser (Next.js 15)  →  Express API  →  PostgreSQL via Prisma
                                      →  Upstash Redis (cache)
Firebase SDK          →  Firebase Admin (JWT verification)
ISBNDB API            →  Express API   (search, filter, format)
```

The client is Next.js 15 with the App Router. The API is Express with Prisma talking to PostgreSQL. Firebase handles auth — the client gets a JWT on login, stores it, and sends it as a Bearer token on every request. The server verifies it with Firebase Admin in a single middleware call.

Search goes through ISBNDB, which gives me volume-level ISBN data. I filter results down to English-language editions and strip art books, box sets, and a few other formats before anything hits the client.

State is managed with React Context — one context for auth, one for the collection. No Redux or Zustand.

Upstash Redis sits in front of the slow queries: search results cached for 24 hours, user collections for 5 minutes. Every mutation hits a `redis.del()` call to invalidate immediately.

---

## Why I made these choices

**Firebase Auth instead of rolling sessions** — auth isn't the interesting part of this project. Firebase takes it off my plate and the JWT verification on the server is a single `admin.auth().verifyIdToken()` call. Moving on.

**Volumes shared across users, not copied** — when you add "Berserk Vol. 1", the server checks if that ISBN already exists in the volumes table. If it does, your collection entry just points to the existing row. This keeps the DB clean and avoids duplicating data that's identical across every user who adds the same book.

**Upstash Redis for caching** — ISBNDB searches are slow and the results for a given query don't change day to day. 24h TTL felt right. 5 minutes on the collection cache is probably aggressive since I invalidate on every mutation anyway, but it's a safety net for anything that slips through.

**Context API, not Redux or Zustand** — the state here is two things: auth state and the collection array. A context per concern is the right amount of complexity for this scope. Adding a state library would be overhead with no payoff.

---

## What I'd do differently

- **Token in localStorage** is the thing I'd fix first. It works, but httpOnly cookies are the right call for auth tokens — localStorage is accessible to any JavaScript on the page.
- **No TypeScript** — I started fast and stayed in JS. Would use TypeScript from day one if starting again.
- **Search pagination** — ISBNDB gives me a fixed result set and I filter it down client-side. Fine at this scale, but not a real solution if the dataset grows.
- **Thin test coverage** — the server has integration tests with mocked Prisma and Firebase Admin, but there's a lot of surface area that isn't covered. The client has almost no tests.

---

## Running it locally

You'll need Node.js, a PostgreSQL database, a Firebase project, and an Upstash Redis instance.

**1. Clone and install**

```bash
git clone https://github.com/Mahib09/MangaLibraryManager.git
cd MangaLibraryManager
```

**2. Server setup** (`cd server`)

Create a `.env` file:

```
DATABASE_URL=postgresql://...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
ISBNDB_API_KEY=...
```

```bash
npm install
npx prisma migrate dev
npm run dev   # starts on localhost:3001
```

**3. Client setup** (`cd client`)

Create a `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
npm install
npm run dev   # starts on localhost:3000
```
