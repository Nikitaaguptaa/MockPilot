const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile extras
  bio: { type: String, default: '' },
  targetRole: { type: String, default: '' },

  // Latest resume — we keep both the extracted text (for quick display)
  // and the original PDF bytes (so the Resume page can offer the real file).
  resumeFileName: { type: String, default: '' },
  resumeText: { type: String, default: '' },
  resumeFileData: { type: Buffer },
  resumeFileMimeType: { type: String, default: 'application/pdf' },
  resumeUpdatedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
