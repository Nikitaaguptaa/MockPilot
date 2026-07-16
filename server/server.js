require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(cors({ origin: 'https://mockpilot-frontend.onrender.com', credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api', require('./routes/interview'));

app.get('/', (req, res) => res.json({ message: '🚀 AI Mock Interview API Running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
