// This is the Vercel serverless entry point. Vercel automatically treats
// any file inside /api as a serverless function. serverless-http adapts
// our existing Express app (unchanged) to the request/response shape
// Vercel's Node runtime expects.
import serverless from 'serverless-http';
import app from '../app.js';

export default serverless(app);
