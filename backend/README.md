# Learnato - Discussion Forum Backend Setup Guide

A modern, robust, and secure backend microservice for the Learnato Discussion Forum, built with Node.js, TypeScript, and MongoDB.

## 🚀 Tech Stack

  - **Framework:** Node.js (v18+)
  - **Server:** Express
  - **Language:** TypeScript
  - **Database:** MongoDB (with Mongoose)
  - **Authentication:** JSON Web Tokens (JWT)
  - **Security:** `bcryptjs`, `helmet`, `cookie-parser`
  - **Validation:** `express-validator`

## 📋 Prerequisites

  - Node.js 18+ and npm
  - A running MongoDB instance (e.g., local `mongodb://127.0.0.1:27017` or a cloud URI)

## 🛠️ Installation & Setup

### 1\. Clone and Install Dependencies

```bash
# Navigate into the backend directory
cd backend

# Install dependencies
npm install
```

### 2\. Configure Environment

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/learnatoForum
JWT_SECRET=averysecretkeyforourhackathon
JWT_EXPIRES_IN=30d

# --- For Production Deployment ---
# NODE_ENV=production
# FRONTEND_URL=https://your-live-frontend-url.com
```

**Note:** Update the `MONGO_URI` to match your MongoDB connection string.

### 3\. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
src/
├── controllers/    # Request handlers (the "logic")
│   ├── post.controller.ts
│   └── user.controller.ts
├── middleware/     # Middleware functions
│   ├── auth.middleware.ts    # Protects routes
│   ├── error.middleware.ts   # Global error handler
│   └── validators.ts         # Input validation
├── models/         # Mongoose schemas
│   ├── post.model.ts
│   └── user.model.ts
├── routes/         # API route definitions
│   ├── post.routes.ts
│   └── user.routes.ts
├── utils/          # Helper utilities
│   ├── db.ts               # MongoDB connection
│   └── generateToken.ts    # JWT cookie generator
├── types/          # TypeScript definitions
│   └── express.d.ts
├── app.ts          # Express app setup (CORS, middleware)
└── server.ts       # Server entry point
```

## ✨ Features

### User Authentication

  - ✅ User Registration (`/api/users/register`)
  - ✅ User Login (`/api/users/login`)
  - ✅ User Logout (`/api/users/logout`) - Clears cookie
  - ✅ Get Current User (`/api/users/me`) - Protected route
  - ✅ Secure password hashing with `bcryptjs`
  - ✅ `httpOnly`, `secure`, `sameSite` cookie management for robust security

### Forum Functionality

  - ✅ Create Post (Protected)
  - ✅ Get All Posts (with sorting by `date` or `votes`)
  - ✅ Get Single Post (with populated replies and authors)
  - ✅ Add Reply to Post (Protected)
  - ✅ Upvote / Un-upvote Post (Protected, toggle logic)

## 🔌 API Endpoints

All endpoints are prefixed with `/api`.

  - `POST /users/register` - Register a new user
  - `POST /users/login` - Login a user (sets cookie)
  - `POST /users/logout` - Logout a user (clears cookie)
  - `GET /users/me` - Get current user's profile (Auth required)
  - `POST /posts` - Create a new post (Auth required)
  - `GET /posts` - Get all posts (Query: `?sort=date` or `?sort=votes`)
  - `GET /posts/:id` - Get a single post by ID
  - `POST /posts/:id/reply` - Add a reply (Auth required)
  - `POST /posts/:id/upvote` - Toggle upvote (Auth required)

## 🧪 Development Scripts

```bash
npm run dev       # Start development server with nodemon
npm run build     # Compile TypeScript to JavaScript
npm run start     # Run the compiled production build
```

## 📦 Key Dependencies

  - `express` - Web framework
  - `mongoose` - MongoDB object modeling
  - `jsonwebtoken` - JWT creation
  - `bcryptjs` - Password hashing
  - `cookie-parser` - Parse `httpOnly` cookies
  - `express-validator` - Input validation and sanitization
  - `cors` - Cross-Origin Resource Sharing
  - `helmet` - Secure HTTP headers
  - `typescript` - Language
  - `ts-node` & `nodemon` - Development helpers

## 🔒 Security Features

  - ✅ **JWT Authentication** protects all user-specific endpoints
  - ✅ **Secure Cookie Management** (`httpOnly`, `secure: true`, `sameSite: 'none'`) prevents XSS and works for cross-domain deployment.
  - ✅ **Password Hashing** (`bcryptjs`) ensures passwords are not stored in plain text.
  - ✅ **Input Validation** (`express-validator`) protects against invalid or malicious data.
  - ✅ **`helmet`** applies 11 essential security headers.
  - ✅ **`express-async-handler`** and a global error handler prevent crashes from unhandled promises.

## 🚀 Production Build (Docker)

A `Dockerfile` is included in the root directory for easy containerization.

```bash
# Build the Docker image
docker build -t learnato-backend .

# Run the container
docker run -p 5000:5000 -e MONGO_URI='...' -e JWT_SECRET='...' learnato-backend
```

**Note:** You must pass in your `.env` variables (like `MONGO_URI` and `JWT_SECRET`) to the container at runtime.

## 🐛 Troubleshooting

### CORS Issues

If you see `No 'Access-Control-Allow-Origin' header` or similar, it's a CORS problem.

1.  **For local development:** The `app.ts` file is configured to work with `http://localhost:5173`.
2.  **For deployment:** The `app.ts` file is configured to dynamically reflect the incoming `origin` header. This should work for any frontend (like Vercel). If it fails, double-check your `cors` config in `app.ts`.

### Connection Failed

1.  Verify your MongoDB server is running.
2.  Check your `.env` file for the correct `MONGO_URI`.
3.  If deployed, ensure your Render/Host has the correct environment variables set.

### Login/Logout Not Working

This is almost always a cookie `sameSite`/`secure` mismatch. The `generateToken.ts` and `user.controller.ts` (logout) files have been configured to work in a cross-site production environment (`sameSite: 'none'`, `secure: true`).
