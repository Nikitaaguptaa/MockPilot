<div align="center">

# 🤖 MockPilot — AI Mock Interview Platform

**Ace your next interview with AI-powered mock interviews, resume analysis, and real-time feedback.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=render)](https://mockpilot-frontend.onrender.com)
![MERN](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

[🔗 Live Demo](https://mockpilot-frontend.onrender.com) · [🐛 Report Bug](https://github.com/Nikitaaguptaa/MockPilot/issues) · [✨ Request Feature](https://github.com/Nikitaaguptaa/MockPilot/issues)

</div>

---

## 📖 About

MockPilot is a full-stack **MERN** application that helps job seekers prepare for interviews using **Google Gemini AI**. Upload your resume for instant ATS analysis, practice role-specific interview questions, and get real-time AI feedback on your answers — all tracked in a personal interview history dashboard.

## ✨ Features

- 🔐 **Secure Auth** — Signup/Login with JWT-based authentication
- 📄 **Resume Analysis** — Upload PDF resume → AI-powered ATS score, strengths & improvement areas
- 🎯 **Smart Questions** — AI-generated, role-specific interview questions
- 💬 **Real-time Feedback** — Instant AI scoring and feedback on your answers
- 📊 **Interview History** — All past sessions saved and tracked in MongoDB
- 🌙 **Dark UI** — Sleek, modern dark-themed interface

## 🖥️ Live Demo

👉 **[https://mockpilot-frontend.onrender.com](https://mockpilot-frontend.onrender.com)**

> ⏳ Note: Hosted on Render's free tier — the app may take 30–60 seconds to wake up on first load.

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, React Router, Vite, CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **AI** | Google Gemini API |
| **Auth** | JWT + bcrypt |
| **Deployment** | Render |

## 🚀 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community edition)

### 1. Clone the repo
```bash
git clone https://github.com/Nikitaaguptaa/MockPilot.git
cd MockPilot
```

### 2. Get a Gemini API Key (free)
1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key" and copy it

### 3. Setup the server
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
MONGO_URI=mongodb://localhost:27017/ai-mock-interview
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=paste_your_gemini_key_here
PORT=5000
```

### 4. Setup the client
```bash
cd client
npm install
```

### 5. Run the app

**Terminal 1 — MongoDB** (if not running as a service):
```bash
mongod
```

**Terminal 2 — Server:**
```bash
cd server
npm run dev
```

**Terminal 3 — Client:**
```bash
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

## 📁 Project Structure

```
MockPilot/
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

## ❓ Troubleshooting

| Issue | Fix |
|---|---|
| MongoDB not connecting | Make sure MongoDB is running (`mongod`) |
| AI not working | Check `GEMINI_API_KEY` in your `.env` file |
| Port conflict | Change `PORT` in `.env` if 5000 is busy |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Nikitaaguptaa/MockPilot/issues).

## 📄 License

This project is open source. Feel free to use it for learning purposes.

---

<div align="center">

Made with ❤️ by [Nikita Gupta](https://github.com/Nikitaaguptaa)

</div>
