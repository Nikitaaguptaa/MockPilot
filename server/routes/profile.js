const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');

/** GET current user's profile (name, email, bio, targetRole, resume meta) */
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** UPDATE name / bio / targetRole. Email changes are intentionally not allowed here. */
router.put('/me', auth, async (req, res) => {
  try {
    const { name, bio, targetRole } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (bio !== undefined) update.bio = bio;
    if (targetRole !== undefined) update.targetRole = targetRole;

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** CHANGE password — requires current password to confirm identity. */
router.put('/me/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** GET the most recently saved resume text (so the Resume page has something to show). */
router.get('/me/resume', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('resumeFileName resumeText resumeUpdatedAt resumeFileData');
    res.json({
      resumeFileName: user.resumeFileName,
      resumeText: user.resumeText,
      resumeUpdatedAt: user.resumeUpdatedAt,
      hasFile: !!(user.resumeFileData && user.resumeFileData.length > 0),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** GET the actual PDF bytes — used by the Resume page's "View / download PDF" button. */
router.get('/me/resume/file', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('resumeFileData resumeFileMimeType resumeFileName');
    if (!user?.resumeFileData) {
      return res.status(404).json({ message: 'No resume file saved yet' });
    }
    res.set('Content-Type', user.resumeFileMimeType || 'application/pdf');
    res.set('Content-Disposition', `inline; filename="${user.resumeFileName || 'resume.pdf'}"`);
    res.send(user.resumeFileData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
