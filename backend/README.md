# E-Commerce Backend — Vercel Zero-Config Version

Vercel now has NATIVE, zero-config support for Express apps — it automatically
detects app.js (or index.js/server.js) and runs it as a single Vercel Function.
No serverless-http wrapper, no vercel.json, no api/ folder needed at all.

## What's different from the Render version
- server.js is used for LOCAL development only (npm run dev)
- app.js holds the actual Express app — Vercel auto-detects THIS file and
  deploys it directly, because it ends with `export default app`
- config/db.js caches the MongoDB connection between invocations, which
  still matters for performance even with Vercel's Fluid compute model

## Local setup (unchanged)
npm install
cp .env.example .env
npm run dev

## Deploying to Vercel
1. Push to GitHub
2. Vercel: Add New Project → import repo → Root Directory = this backend folder
3. Framework Preset: Vercel should auto-detect "Express" — leave it
4. Add environment variables: MONGO_URI, JWT_SECRET
5. Deploy
6. Visit the URL directly — you should see "API is running..."
7. Update your frontend's VITE_API_URL to this URL + /api, then redeploy
