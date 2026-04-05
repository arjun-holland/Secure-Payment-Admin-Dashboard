# Production Deployment Guide

This project is fully ready for deployment. The application consists of a Node.js backend mapped to a MongoDB Atlas cluster, and a React (Vite) frontend.

## 1. Deploying the Backend (Render, Railway or Heroku)
The backend does not require any special build steps. It serves the REST API.
- **Build Command:** `npm install`
- **Start Command:** `npm start` (already defined in `backend/package.json`)

**Required Environment Variables:**
- `MONGO_URI`: Your MongoDB Atlas URI.
- `PORT`: Usually automatically assigned by the deployment platform.
- `JWT_SECRET`: A strong secret key to sign your authentication tokens.
- `REDIS_URL`: Your Redis cluster connection URL for idempotency checks.
- `FRONTEND_URL`: The production URL of your **deployed frontend** (e.g., `https://my-secure-frontend.vercel.app`). *This is crucial for the dynamic CORS policy block to work.*
- `ADMIN_EMAIL`: The designated email address for the lone admin user.
- `ADMIN_PASSWORD`: A strong password for your admin auto-generation script.

*Wait for the backend deployment to finish and grab the production URL (e.g., `https://secure-pay-backend.onrender.com`).*

## 2. Deploying the Frontend (Vercel or Netlify)
The frontend uses Vite and React Router. A `vercel.json` rewrite file is already configured in `/frontend` so single-page routing will not crash with a `404 Not Found` upon page refresh.
- **Root Directory:** Make sure to set the root directory to `frontend` in Vercel settings so Vercel builds the correct folder.
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**Required Environment Variables (in Vercel):**
- `VITE_API_URL`: Your newly deployed **backend URL** (e.g., `https://secure-pay-backend.onrender.com`). Do not append `/api` to it, the application does it automatically now!

Once deployed, make sure to add the final frontend URL to the `FRONTEND_URL` variable inside your backend dashboard, and everything is linked up and ready!
