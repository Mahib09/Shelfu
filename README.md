# ShelfU — Manga Collection Manager

ShelfU is a full-stack web application that helps users organize, track, and manage personal manga collections.  
It solves a real-world organization problem while demonstrating production-ready frontend and backend engineering practices.

**Live Demo:** https://shelfu.app  

---

## Why ShelfU?

Manga collectors often rely on spreadsheets, notes, or memory to track owned and missing volumes.  
ShelfU centralizes this process into a clean, searchable, and scalable platform accessible across devices.

---

## Core Features

### Authentication & User Accounts
- Secure user registration and login using Firebase Authentication
- Protected routes and user-specific data isolation

### Manga Search & Import
- Search manga using external book APIs (ISBN DB, Open Library)
- Normalized and validated third-party API data before storage

### Collection Management
- Add, update, and remove manga from a personal collection
- View detailed metadata per series
- Track ownership at the volume level

### Volume Tracking & Dashboard
- Track owned vs missing volumes
- Collection-level statistics for visibility
- Optimized database queries for fast load times

### Responsive UI
- Fully responsive layout
- Optimized for desktop, tablet, and mobile usage

---

## Tech Stack

### Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Query

### Backend
- Node.js
- Express
- REST APIs
- Prisma ORM

### Database
- PostgreSQL
- Normalized relational schema
- Indexed queries for performance

### Authentication
- Firebase Authentication
- JWT-based session handling

---

## Architecture Highlights

- Clear separation of frontend and backend responsibilities
- API-first design with scalable data models
- Prisma used for type-safe schema management and migrations
- Validation and error handling at API boundaries
- Designed for future extensibility (sharing, analytics, wishlists)

---

## Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/your-username/shelfu.git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
