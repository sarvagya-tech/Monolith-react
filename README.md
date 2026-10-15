# ⚡ MONOLITH

<div align="center">

![Monolith Banner](https://raw.githubusercontent.com/sarvagya-tech/Monolith-react/main/monolith-react/src/assets/hero.png)

### **Your Second Brain, Always On.**
*High-velocity AI assistant engineered with Groq LPU acceleration, multi-turn memory, and persistent cloud session vaults.*

[![React](https://img.shields.io/badge/React-19.2-black?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_8.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Groq](https://img.shields.io/badge/Groq-LPU_Inference-F05A28?style=for-the-badge)](https://groq.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Live Demo](#deployment-guide) • [Architecture](#system-architecture) • [API Reference](#api-specification) • [Local Setup](#local-development)

</div>

---

## 📋 Overview

**Monolith** is a full-stack, cyber-brutalist artificial intelligence workstation designed for developers, researchers, and technical operatives. Built on top of **Groq's Language Processing Units (LPUs)**, Monolith delivers sub-second inference speeds (~500 tokens/sec) with zero cold-starts, state-of-the-art context retention across conversational turns, and persistent encrypted session archives stored in MongoDB Atlas.

---

## ✨ Key Capabilities

- **⚡ Sub-Second LPU Inference**: Powered by Groq's high-throughput hardware, streaming reasoning and code generation at near-instantaneous velocities.
- **🧠 Multi-Turn Conversational Memory**: Preserves context timelines within each thread, allowing deep iterative follow-ups and complex troubleshooting.
- **💾 Persistent Cloud Vault**: Every session is indexed to the user's operative ID in MongoDB Atlas, accessible across any browser or device.
- **💻 Code Engineering Suite**: Automatic language detection, dedicated monospace code containers, and 1-click clipboard extraction.
- **🔒 Enterprise HttpOnly Security**: Complete protection against XSS and token interception via tamper-proof JWT cookies (`accessToken` & `refreshToken`).
- **🎯 Interactive Direct Dispatch**: Launch directives straight from the landing page terminal preview or browse archived historical conversations.
- **🌐 Responsive Cyber-Brutalist Interface**: Ultra-high contrast design, interactive plexus particle canvas, fluid responsive typography, and mobile-ready drawers.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** | Ultra-fast client-side rendering with HMR |
| **Frontend Styling** | **Tailwind CSS 3.4** | Custom high-contrast dark cyberpunk palette |
| **Client Routing** | **React Router DOM 7** | Single Page Application (SPA) with deep links |
| **HTTP Client** | **Axios** | Centralized response unwrap & credentials handling |
| **Backend Runtime** | **Node.js** + **Express 5** | Modular REST API service with async error handling |
| **Database & ODM** | **MongoDB Atlas** + **Mongoose 8** | Cloud replica set database with TTL token lifecycle |
| **AI Inference** | **Groq SDK** (`openai/gpt-oss-120b`) | Ultra-low latency LPU model completions |
| **Authentication** | **JWT** + **Bcrypt** | Encrypted password hashing with dual-token auth |

---

## 📂 Project Architecture

```
Bot/
├── Backend/                       # Express REST API Server
│   ├── src/
│   │   ├── Model/                # Mongoose Database Models (User, Chat)
│   │   ├── controller/           # Business Logic (Auth, Chat Sessions)
│   │   ├── db/                   # MongoDB Atlas Connection Handler
│   │   ├── middleware/           # JWT Verification & Optional Auth
│   │   ├── routes/               # Express Route Definitions (/user, /chat)
│   │   ├── service/              # External Groq AI Service Wrapper
│   │   ├── utils/                # APIError, ApiResponse, AsyncHandler
│   │   ├── app.js                # Express App Configuration & CORS
│   │   └── index.js              # Server Entrypoint & Port Listener
│   └── package.json
│
└── monolith-react/                # React Vite Frontend Application
    ├── public/                   # Static Assets & _redirects for Netlify
    ├── src/
    │   ├── assets/               # Images and Visual Media
    │   ├── components/           # Navbar, Hero, ChatInterface, Features, etc.
    │   ├── context/              # AuthContext & Session Provider
    │   ├── hooks/                # Custom useAuth Hook
    │   ├── pages/                # Landing, ChatTerminal, Login, Register
    │   ├── service/              # Axios Interceptors & Normalized API Calls
    │   ├── App.jsx               # Route Declarations & ErrorBoundary
    │   └── main.jsx              # React DOM Mounting
    ├── vercel.json               # Vercel SPA Client Routing Rewrites
    └── package.json
```

---

## 📡 API Specification

All backend endpoints are prefixed with `/api/v2`:

### 🔐 Authentication (`/api/v2/user`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v2/user/register` | Public | Register new operative with fullname, email, password |
| `POST` | `/api/v2/user/login` | Public | Authenticate operative and assign secure HttpOnly cookies |
| `POST` | `/api/v2/user/logout` | Optional | Clear session cookies and invalidate refresh tokens |
| `GET` | `/api/v2/user/me` | Protected | Fetch current operative profile from JWT credentials |

### 💬 Neural Chat Engine (`/api/v2/chat`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v2/chat` | Protected | Initialize a new conversation thread with first prompt |
| `POST` | `/api/v2/chat/:chatId` | Protected | Dispatch follow-up message to an existing thread |
| `GET` | `/api/v2/chat` | Protected | Retrieve all archived conversations for the operative |
| `GET` | `/api/v2/chat/:chatId` | Protected | Retrieve full message history of a specific conversation |

---

## 🚀 Local Development

### 1. Prerequisites
- **Node.js** v18+ installed
- **Git** installed
- A **MongoDB Atlas** cluster connection string
- A **Groq Cloud API Key** from [console.groq.com](https://console.groq.com)

### 2. Clone Repository
```bash
git clone https://github.com/sarvagya-tech/Monolith-react.git
cd Monolith-react
```

### 3. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:
```env
PORT=7000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.p4mpa2x.mongodb.net/?appName=Cluster0
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
ACCESS_TOKEN_SECRET=your_jwt_access_secret_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_key
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

Start the backend development server:
```bash
npm run dev
```
*Backend runs on `http://localhost:7000`*

### 4. Frontend Setup
In a new terminal window:
```bash
cd monolith-react
npm install
```

Create a `.env` file inside `monolith-react/`:
```env
VITE_API_URL=http://localhost:7000/api/v2
```

Start the frontend development server:
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🌐 Deployment Guide

### Deploy Backend ([Render.com](https://render.com) / [Railway](https://railway.app))
1. Create a **New Web Service** pointing to your GitHub repository.
2. Set **Root Directory** to `Backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. Add all environment variables listed in the Backend `.env` configuration above.
6. Set `NODE_ENV=production`.
7. Once deployed, note your service URL (e.g. `https://monolith-backend.onrender.com`).

### Deploy Frontend ([Vercel.com](https://vercel.com) / [Netlify](https://netlify.com))
1. Create a **New Project** importing your repository.
2. Set **Root Directory** to `monolith-react`.
3. Framework preset will automatically detect **Vite**.
4. In **Environment Variables**, set:
   ```
   VITE_API_URL=https://monolith-backend.onrender.com/api/v2
   ```
5. Click **Deploy**.
6. In your backend hosting dashboard, update `CORS_ORIGIN` to match your new Vercel domain (e.g., `https://monolith-react.vercel.app`).

---

## 🔒 Security & Best Practices

- **Zero-Storage Auth**: Access tokens and refresh tokens are stored strictly inside secure, browser-restricted `HttpOnly`, `SameSite=None` (production) cookies, preventing cross-site scripting (XSS) extraction.
- **Fail-Fast Database Handler**: Database connections utilize configurable timeouts (`serverSelectionTimeoutMS`) and explicit error propagation.
- **Strict Input Validation**: All routes enforce parameter type checking and MongoDB `ObjectId` validation to protect against NoSQL injection and malformed query crashes.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<div align="center">
  <sub>Developed by <a href="https://github.com/sarvagya-tech">sarvagya-tech</a> • Powered by Groq LPU™ Inference & MongoDB Atlas</sub>
</div>
