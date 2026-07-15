# 🤖 AI Mock Interview

Dark-themed MERN stack app with Google Gemini AI for interview prep.

## Features
- ✅ Signup / Login with JWT
- ✅ Upload PDF Resume → AI Analysis (ATS Score, Strengths, Improvements)
- ✅ AI-generated role-specific interview questions
- ✅ Answer questions → Get real-time AI feedback + score
- ✅ Interview history saved in MongoDB
- ✅ Beautiful dark UI (same as portfolio)

---

## 🚀 Setup — Step by Step

### Step 1 — Prerequisites (install once)
- [Node.js](https://nodejs.org) — LTS version
- [MongoDB](https://www.mongodb.com/try/download/community) — Community edition
- [VS Code](https://code.visualstudio.com)

### Step 2 — Get Gemini API Key (FREE)
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 3 — Setup Server
```bash
cd server
npm install
```

Create a `.env` file inside `server/` folder:
```
MONGO_URI=mongodb://localhost:27017/ai-mock-interview
JWT_SECRET=nikita_secret_key_2026
GEMINI_API_KEY=paste_your_gemini_key_here
PORT=5000
```

### Step 4 — Setup Client
```bash
cd client
npm install
```

### Step 5 — Run the App

**Terminal 1 — Start MongoDB** (if not running as service):
```bash
mongod
```

**Terminal 2 — Start Server:**
```bash
cd server
npm run dev
```
You should see: `✅ Server running on port 5000` and `✅ MongoDB Connected`

**Terminal 3 — Start Client:**
```bash
cd client
npm run dev
```
Open: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure
```
ai-mock-interview/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── pages/          # Home, Login, Signup, Dashboard, Interview, History
│       ├── components/     # Navbar, ProtectedRoute
│       ├── context/        # AuthContext (login state)
│       └── api.js          # Axios instance
│
└── server/                 # Node.js + Express backend
    ├── models/             # User.js, Interview.js (MongoDB schemas)
    ├── routes/             # auth.js, interview.js
    ├── middleware/         # auth.js (JWT check)
    ├── db.js               # MongoDB connection
    └── server.js           # Main entry point
```

## 🎨 Tech Stack
- **Frontend**: React, React Router, Vite, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **AI**: Google Gemini API
- **Auth**: JWT + bcrypt

## ❓ Common Issues
- **MongoDB not connecting**: Make sure MongoDB is running (`mongod` command)
- **AI not working**: Check your GEMINI_API_KEY in .env file
- **Port conflict**: Change PORT in .env if 5000 is busy
