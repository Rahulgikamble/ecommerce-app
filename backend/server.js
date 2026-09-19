// This file is used for LOCAL development and for Render (or any normal
// long-running host). It is NOT used by Vercel — Vercel instead calls
// api/index.js directly, treating each request as its own invocation.
import app from './app.js';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
