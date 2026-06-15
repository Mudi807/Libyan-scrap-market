# Scrap Market Backend — Setup & Run Guide

## 1. Prerequisites
- Node.js 18+
- A PostgreSQL database (Supabase, Neon, Railway, or local Postgres)

## 2. Install dependencies
```bash
npm install
```

## 3. Configure environment variables
```bash
cp .env.example .env
```
Then edit `.env`:
- `DATABASE_URL` → your Postgres connection string (Supabase: Project Settings → Database → Connection String → URI)
- `JWT_SECRET` → generate with `openssl rand -base64 32`
- `PORT`, `CLIENT_URL`, etc. as needed

## 4. Set up the database
```bash
npx prisma generate
npx prisma migrate dev --name init
```
This creates the `users`, `listings`, `bids`, `transactions`, and `pickups` tables.

## 5. Run the server
```bash
npm run dev
```
Server starts at `http://localhost:5000`.

## 6. Test the auth endpoints

**Signup**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123","role":"SELLER"}'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"password123"}'
```

**Get current user (protected)**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN_FROM_LOGIN_RESPONSE>"
```

## Project structure
```
src/
  config/db.ts          → Prisma client + DB connection
  controllers/           → Business logic (authController.ts)
  middleware/             → auth (JWT verify), validation
  routes/                 → Express route definitions
  utils/jwt.ts            → token sign/verify helpers
  app.ts                  → Express app config
  server.ts               → entry point
prisma/schema.prisma     → DB schema (Users, Listings, Bids, Transactions, Pickups)
```

## Next steps
- Listings CRUD endpoints
- Bids endpoints
- Transactions + Pickups
- File upload for listing photos (Supabase Storage / S3)
