# Libyan Scrap Market — Frontend

Next.js 14 · TypeScript · Tailwind CSS · Bilingual EN/AR

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with price ticker, how-it-works, materials |
| `/login` | Authentication — log in |
| `/signup` | Authentication — register as buyer or seller |
| `/listings` | Browse all listings with filters and search |
| `/listings/[id]` | Listing detail with bid/buy panel |
| `/dashboard` | User dashboard — stats, earnings, recent listings |
| `/create-listing` | Seller form to post new scrap listing |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL

# 3. Run dev server
npm run dev
```

App runs at `http://localhost:3000`.

## Push to GitHub

```bash
cd ~/libyan-scrap-market
# frontend folder should be alongside backend/
git add frontend/
git commit -m "Add frontend: Next.js app with full UI"
git push origin main
```

## Deploy to Vercel

1. Go to vercel.com → Add New Project → Import `Mudi807/Libyan-scrap-market`
2. Set **Root Directory** to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
4. Click Deploy

## Architecture notes

- `src/context/LanguageContext.tsx` — EN/AR toggle, RTL support
- `src/context/AuthContext.tsx` — JWT session management
- `src/lib/translations.ts` — all UI strings in English + Arabic
- `src/lib/mockData.ts` — placeholder listings (replace with real API calls)
- `src/lib/api.ts` — fetch wrapper with auth header injection
