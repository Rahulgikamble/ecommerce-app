# MyShop — MERN E-Commerce App

Full stack: React (Vite) frontend + Node/Express/MongoDB Atlas backend.
Features: Register/Login (JWT), product listing with search/filter/sort,
product details, add to cart, increase/decrease quantity, cart persisted
per-user in MongoDB (survives logout/login), checkout -> creates an Order.

See the setup steps given in chat for full step-by-step instructions.

## Quick start

### Backend
cd backend
npm install
cp .env.example .env      # then paste your MongoDB Atlas URI + a JWT secret
npm run seed               # loads ~20 fake products into your DB
npm run dev                 # starts on http://localhost:5000

### Frontend
cd frontend
npm install
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm run dev                 # starts on http://localhost:5173
