# VeloxLearn

A reading comprehension app that lets you upload texts, read them, and test your understanding with multiple-choice questions.

**Live:** [veloxlearn.com](https://veloxlearn.com)

## What it does

1. Upload a text with a title and comprehension questions (multiple choice)
2. Read the text at your own pace
3. Answer the questions and see your score

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS — deployed on Vercel
- **Backend:** Node.js, Express, Prisma — deployed on Render
- **Database:** PostgreSQL hosted on Supabase

## Project Structure

```
veloxlearn/
├── frontend/   # React app
└── backend/    # Express REST API
```

## Local Development

### Prerequisites
- Node.js
- A Supabase project (for the PostgreSQL database)

### Backend

```bash
cd backend
cp .env.example .env
# Fill in DATABASE_URL and API_KEY in .env
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and calls the backend at `http://localhost:3000/api` by default.

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (use pooler URL in production) |
| `DIRECT_URL` | Direct PostgreSQL connection string (used by Prisma for migrations) |
| `API_KEY` | Secret key required to upload texts |
| `PORT` | Port the server listens on (default: 3000) |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (defaults to `http://localhost:3000/api`) |
