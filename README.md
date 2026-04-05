
# FinShield: Secure Payment Infrastructure

**Live Deployment:** https://secure-payment-admin-dashboa.onrender.com

FinShield is a full-stack, enterprise-grade payment simulation platform built on the MERN stack. It mimics real-world financial systems by enforcing strict constraints such as transaction idempotency, caching, API rate-limiting, and Role-Based Access Control (RBAC) to ensure absolute data integrity and system security.

## 🚀 Key Features

*   **Idempotent Payment Gateway:** Eliminates duplicate financial transactions caused by network lag or double-clicking by tracking unique, timestamp-based `Idempotency-Key` headers.
*   **Role-Based Access Control (RBAC):** Employs JSON Web Tokens (JWT) to establish an isolated administration boundary, ensuring standard users can only generate payments, while admins can monitor them.
*   **Redis Acceleration:** Integrates a Read-Through caching mechanism leveraging Redis. Dashboard analytics load near-instantly from in-memory cache, reducing expensive disk reads on MongoDB.
*   **API Fortification:** Protects exposed endpoints using strict Rate Limiting middlewares, blocking DoS attacks and spam scripts.
*   **Automated Admin Seeding:** Secures administrative access using a protected backend initialization script rather than an exposed registration endpoint.

## 💻 Tech Stack

*   **Frontend:** React.js, Vite, React Router, Tailwind CSS, Axios
*   **Backend:** Node.js, Express.js
*   **Database & Caching:** MongoDB (Mongoose), Redis Cloud
*   **Security:** JSON Web Tokens (JWT), Bcrypt.js, Express Rate Limit


## Output
### Login Page
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8fda97b1-8472-41b4-96ed-977c6ea28709" />

### Admin Page
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/80d64d4d-4347-4333-adf0-befaef48f7ce" />

### User Page
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/18c8b5b6-fe9b-4a78-b7f4-c4eee5931bc0" />

### Payment at User Side
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4950601a-c33a-4185-a723-9a6c02ebede4" />

### Payment Details at Admin Side
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ff242f4a-f040-4455-9790-0035ea8b8db2" />


## ⚙️ Local Setup Guide

Follow these instructions to run the application locally on your machine.

### 1. Clone & Install Dependencies
First, clone the repository and install the dependencies for both the frontend and backend.
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in both the `/backend` and `/frontend` directories.

**`/backend/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_key_123
REDIS_URL=your_redis_cloud_url
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=strongadminpassword
```

**`/frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Servers
Open two terminal windows to run both servers concurrently.
```bash
# Terminal 1: Start Backend (Inside /backend)
npm run dev

# Terminal 2: Start Frontend (Inside /frontend)
npm run dev
```
The frontend should now be running on `http://localhost:5173`! 

## 🌐 Deployment Infrastructure

*   **Frontend Hosting:** Vercel (Configured with `vercel.json` SPA Client-Side Rewrites)
*   **Backend Hosting:** Render / Web Services (Configured with automated CORS origin detection)
