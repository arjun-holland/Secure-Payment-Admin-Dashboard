# Secure Payment Admin Dashboard

A **fintech-style payment processing system** designed to demonstrate **production-grade backend engineering concepts** such as **idempotent APIs, JWT authentication, rate limiting, Redis caching, and layered architecture**.

The project includes a **React-based admin dashboard** that allows administrators to create and monitor payment transactions through a secure backend API.

This system focuses on **correctness, reliability, and performance**, similar to real-world payment platforms such as **Stripe, Razorpay, and PayPal**.

---

# 🌐 Live Demo

🔗 **Live Application:**
[https://secure-payment-admin-dashboard-app-link.onrender.com](https://secure-payment-admin-dashboard-1.onrender.com/)


---

# 🖼 Application Screenshots

## Login Page
<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/dc05cd6d-f8b2-4ae4-81f4-601ee2ab5862" />

## Create Account Page
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/6c185449-c482-4dbc-8132-1866de250910" />


## Create Payment

<img width="1892" height="1004" alt="image" src="https://github.com/user-attachments/assets/c5a84b03-5fd0-4cff-b43e-7a8c2c741844" />

## Transactions View

<img width="1912" height="1018" alt="image" src="https://github.com/user-attachments/assets/d0978d41-9caf-4a86-8e3d-2df20e1c26f3" />


---

# 🚀 Key Features

## JWT Authentication & Authorization

The system uses **JWT (JSON Web Tokens)** to secure API endpoints.

Only authenticated users can access protected routes such as payment creation.

Example request header:

```
Authorization: Bearer <JWT_TOKEN>
```

Authentication middleware verifies the token before allowing the request to continue.

---

## Idempotent Payment APIs

Prevents duplicate transaction processing using **Idempotency-Key headers** (Stripe-style design).

If the same request is sent multiple times with the same key, the server **returns the existing transaction instead of creating a duplicate**.

Example:

```
Idempotency-Key: txn_171234567
```

This guarantees **safe retries for financial operations**.

---

## Rate Limiting Protection

Protects the API from abuse by limiting the number of requests allowed within a time window.

Example configuration:

```
Max 5 payment requests per IP within a time window
```

If exceeded, the server returns:

```
HTTP 429 – Too Many Requests
```

This prevents **API abuse and server overload**.

---

## Redis Read-Through Caching

Improves performance by caching frequently accessed transactions using **Redis**.

Flow:

```
Client Request
      ↓
Check Redis Cache
      ↓
Cache Miss → Query MongoDB
      ↓
Store result in Redis
      ↓
Return response
```

This significantly reduces database load and improves response time.

---

## MongoDB as Source of Truth

All payment transactions are stored in **MongoDB Atlas**.

Writes always go directly to MongoDB to ensure **strong consistency and reliable persistence**.

---

## Collision-Resistant Transaction IDs

Each payment receives a **compact Base62 encoded transaction ID** generated using hashing techniques to avoid collisions.

Example:

```
TX8kJ39Lm
```

---

## Admin Dashboard (React)

A **React-based admin panel** allows users to:

* Create payment requests
* Generate idempotency keys
* View transaction responses
* Monitor transaction activity
* Test idempotent request behavior

---

## Clean Layered Architecture

The backend follows a **production-style layered architecture**:

```
Routes → Controllers → Services → Database
```

Benefits:

* Improved maintainability
* Clear separation of concerns
* Easier scalability

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* JWT Authentication
* Express Rate Limiter

## Frontend

* React
* Vite
* TailwindCSS

## Database

* MongoDB Atlas

## Cache

* Redis (Upstash)

## Deployment

* Render

## Testing

* Postman
* Browser Admin Dashboard

---

# 📡 API Endpoints

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| POST   | `/api/auth/login` | Authenticate user             |
| POST   | `/api/payments`   | Create a payment (idempotent) |
| GET    | `/api/payments`   | Retrieve transactions         |

---

# 🧩 System Architecture

```
                 Client (Admin Dashboard)
                          ↓
                 JWT Authentication
                          ↓
                    Rate Limiter
                          ↓
                   Express Routes
                          ↓
                     Controllers
                          ↓
                      Services
                          ↓
                MongoDB (Writes)
                          ↑
                 Redis Cache (Reads)
```

---

# ⚡ Performance

Redis caching improves system performance by reducing repeated database queries.

Under simulated load testing:

```
~60% reduction in read latency
```

Transactions are cached with **TTL-based eviction** to maintain fresh data.

---

# ▶️ Running the Project Locally

## 1️⃣ Clone the Repository

```
git clone https://github.com/arjun-holland/secure-payment-admin-dashboard.git
```

---

## 2️⃣ Install Dependencies

### Backend

```
cd backend
npm install
```

### Frontend

```
cd frontend
npm install
```

---

## 3️⃣ Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 4️⃣ Start Backend

```
cd backend
npm run dev
```

---

## 5️⃣ Start Frontend

```
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

# 🧪 Testing with Postman

### Required Headers

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
Idempotency-Key: <unique-key>
```

---

### Example Request

```
POST /api/payments
```

Body:

```
{
  "name": "Test User",
  "userId": "user123",
  "amount": 500
}
```

---

### Example Response

```
{
  "transactionId": "TX8kJ39Lm",
  "userId": "user123",
  "amount": 500,
  "status": "SUCCESS",
  "idempotencyKey": "txn_123456"
}
```

Sending the **same request with the same Idempotency-Key** returns the **same transaction**, ensuring safe retries.

---

# 🗄 Data Persistence

Example MongoDB document:

```
{
  transactionId: "TX8kJ39Lm",
  userId: "user123",
  amount: 500,
  status: "SUCCESS",
  idempotencyKey: "txn_123456"
}
```

---

# 🧠 Concepts Demonstrated

This project demonstrates several **advanced backend engineering concepts**:

* Idempotent API design
* JWT authentication & authorization
* API rate limiting
* Redis caching strategies
* Scalable layered architecture
* Backend reliability for financial systems
* Full-stack integration (React + Node.js)


---

# 📌 Project Goal

This project was built to **simulate a production-style fintech backend system** and demonstrate **backend system design principles beyond basic CRUD APIs**.

The goal is to showcase **real-world backend architecture patterns used in payment systems**.
