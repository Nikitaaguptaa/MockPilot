const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  resumeAnalysis: { type: String },
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  questions: [{ type: String }],
  answers: [{ type: String }],
  feedback: [{ type: String }],
  score: { type: Number, default: 0 },
  atsScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
