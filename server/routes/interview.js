const router = require('express').Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');
const auth = require('../middleware/auth');
const Interview = require('../models/Interview');
const User = require('../models/User');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * Gemini doesn't always return clean JSON — sometimes it wraps the JSON in
 * markdown fences, sometimes it adds a sentence before/after the object.
 * This pulls out the first {...} block and parses that instead of assuming
 * the whole response string is valid JSON.
 */
function extractJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) {
    throw new Error('No JSON object found in AI response');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

// ANALYZE RESUME
router.post('/resume/analyze', auth, upload.single('resume'), async (req, res) => {
  try {
    const { role } = req.body;
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are an expert HR and ATS system. Analyze this resume for the role of "${role}".
Resume:
${resumeText}

Return a JSON object with:
{
  "atsScore": <number 0-100>,
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "summary": "2-3 sentence summary",
  "questions": ["question1", "question2", "question3", "question4", "question5"]
}
Return ONLY the JSON, no markdown, no backticks.`;

    const response = await ai.models.generateContent({
      model: gemini-3.5-flash,
      contents: prompt,
    });

    const analysis = extractJSON(response.text);

    const interview = await Interview.create({
      userId: req.user.id,
      role,
      resumeAnalysis: analysis.summary,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      questions: analysis.questions,
      atsScore: analysis.atsScore,
    });

    // Keep the latest resume + target role on the user profile too,
    // so the Resume page can show it without re-uploading.
    await User.findByIdAndUpdate(req.user.id, {
      resumeFileName: req.file.originalname,
      resumeText,
      resumeFileData: req.file.buffer,
      resumeFileMimeType: req.file.mimetype || 'application/pdf',
      resumeUpdatedAt: new Date(),
      targetRole: role,
    });

    res.json({ ...analysis, interviewId: interview._id });
  } catch (err) {
    console.error('Resume analyze error:', err);
    res.status(500).json({ message: 'Analysis failed: ' + err.message });
  }
});

// SUBMIT ANSWER & GET FEEDBACK
router.post('/interview/answer', auth, async (req, res) => {
  try {
    const { interviewId, question, answer } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are an expert interviewer. Evaluate this answer.
Question: "${question}"
Answer: "${answer}"

Return JSON:
{
  "feedback": "detailed feedback 2-3 sentences",
  "score": <number 0-10>,
  "tip": "one improvement tip"
}
Return ONLY JSON, no markdown, no backticks.`;

    // Gemini occasionally returns malformed JSON on a given attempt — retry once
    // before falling back, since a second call usually succeeds.
    let evaluation;
    let lastError;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
        });
        evaluation = extractJSON(response.text);
        break;
      } catch (err) {
        lastError = err;
      }
    }
    if (!evaluation) throw lastError;

    await Interview.findByIdAndUpdate(interviewId, {
      $push: { answers: answer, feedback: evaluation.feedback }
    });

    res.json(evaluation);
  } catch (err) {
    console.error('Answer error:', err);
    res.status(500).json({ message: err.message });
  }
});

// COMPLETE INTERVIEW
router.post('/interview/complete', auth, async (req, res) => {
  try {
    const { interviewId, score } = req.body;
    const interview = await Interview.findByIdAndUpdate(
      interviewId, { score }, { new: true }
    );
    res.json({ message: 'Interview saved', interview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET HISTORY
// Only return sessions where the candidate actually answered at least one
// question — resume-analyze alone creates an Interview row, but that's not
// a "session" worth showing in history until something was answered.
router.get('/interviews/history', auth, async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user.id,
      'answers.0': { $exists: true },
    }).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE INTERVIEW
router.get('/interviews/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;