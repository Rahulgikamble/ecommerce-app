# E-Commerce Backend — Vercel Serverless Version

This is your e-commerce backend restructured to run as Vercel serverless
functions instead of a normal always-on server, so it has no monthly hour
cap and never sleeps.

## What changed from the Render version
- server.js now only handles LOCAL development (npm run dev)
- app.js holds the actual Express app (routes, middleware) — shared by both
  local dev and Vercel
- api/index.js is the new Vercel entry point (auto-detected by Vercel)
- config/db.js now caches the MongoDB connection between requests — this
  is essential for serverless; without it, every request would try to
  open a new DB connection and could exhaust your Atlas connection limit
- vercel.json routes every request through api/index.js

## Local setup (unchanged)
npm install
cp .env.example .env      # same MONGO_URI, JWT_SECRET as before
npm run dev                 # still works exactly as before, on port 5000

## Deploying to Vercel
1. Push this to GitHub (replacing your old backend folder, or as a new repo)
2. In Vercel: Add New Project → import the repo → set Root Directory to
   wherever this backend folder lives in your repo
3. Framework Preset: Other (not Vite — this isn't a frontend)
4. Add environment variables: MONGO_URI, JWT_SECRET
5. Deploy
6. Your API will be live at https://your-project.vercel.app — test it by
   visiting the URL directly, you should see "API is running..."
7. Update your e-commerce FRONTEND's VITE_API_URL environment variable
   (in ITS Vercel project settings) to point here, e.g.:
   VITE_API_URL=https://your-new-backend.vercel.app/api
   Then redeploy the frontend.
