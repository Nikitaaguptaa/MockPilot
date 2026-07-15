import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaBrain,
  FaBullseye,
  FaChartLine,
  FaFileAlt,
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHistory,
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import api from '../../api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import IconCircle from '../../components/ui/IconCircle'
import FormField from '../../components/ui/FormField'
import { getScoreColor, getScoreStatus } from '../../utils/score'
import { DashboardAnimation } from '../../components/ui/LottieAnim'
import styles from './Dashboard.module.css'

const SIDE_FEATURES = [
  { title: 'AI powered', desc: 'Gemini AI reads and understands your resume deeply', icon: <FaBrain /> },
  { title: 'Role specific', desc: 'Questions tailored to your exact target position', icon: <FaBullseye /> },
  { title: 'ATS score', desc: 'Know how ATS-friendly your resume is instantly', icon: <FaChartLine /> },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)

  const firstName = user?.name?.split(' ')[0] || 'there'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !role) {
      setError('Please enter a role and upload your resume')
      return
    }
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('resume', file)
    formData.append('role', role)

    try {
      const { data } = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setAnalysis(data)
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const startInterview = () => {
    localStorage.setItem('interviewData', JSON.stringify(analysis))
    localStorage.removeItem('interviewProgress')
    navigate('/interview')
  }

  const circumference = 2 * Math.PI * 40
  const offset = analysis
    ? circumference - (analysis.atsScore / 100) * circumference
    : circumference

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.welcomeWrap}>
          <div className={styles.welcomeAnimCol}>
            <DashboardAnimation />
          </div>
          <div className={styles.welcomeTextCol}>
            <div className={styles.welcome}>
              <div>
                {/* <span className={styles.tag}>Dashboard</span> */}
                <h1>Hey, <span>{firstName}</span></h1>
                <p>Upload your resume and get AI-powered interview prep tailored for your target role.</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/history')}>
                <FaHistory /> View history
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Upload form */}
          <Card className={styles.uploadCard}>
            <div className={styles.cardHeader}>
              <IconCircle tone="blue">
                <FaFileAlt />
              </IconCircle>
              <div>
                <h2>Start a new interview session</h2>
                <p>Upload your resume PDF and select your target role to begin</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <FormField label="Target role">
                <input
                  placeholder="e.g. Full Stack Developer, Data Analyst, SDE-2..."
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value)
                    setError('')
                  }}
                  required
                />
              </FormField>

              <FormField label="Resume (PDF only)">
                <div
                  className={`${styles.dropzone} ${file ? styles.hasFile : ''}`}
                  onClick={() => document.getElementById('resumeFile').click()}
                >
                  {file ? (
                    <div className={styles.fileInfo}>
                      <FaFileAlt />
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                        }}
                        aria-label="Remove file"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.dropIcon}>
                        <FaCloudUploadAlt />
                      </div>
                      <p>Click to upload your resume</p>
                      <small>PDF format · Max 5MB</small>
                    </>
                  )}
                  <input
                    id="resumeFile"
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => {
                      setFile(e.target.files[0])
                      setError('')
                    }}
                  />
                </div>
              </FormField>

              {error && <p className="error-msg">{error}</p>}

              <Button type="submit" variant="primary" loading={loading} className={styles.analyzeBtn}>
                {loading ? 'Analyzing with AI...' : 'Analyze resume & generate questions'}
              </Button>
            </form>
          </Card>

          {/* Side feature cards */}
          <div className={styles.sideCol}>
            {SIDE_FEATURES.map((feature) => (
              <Card key={feature.title} className={styles.sideCard}>
                <IconCircle tone="blue" size={36}>{feature.icon}</IconCircle>
                <div>
                  <div className={styles.sideTitle}>{feature.title}</div>
                  <div className={styles.sideDesc}>{feature.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className={styles.analysisSection}>
            <div className={styles.analysisTop}>
              <h2>Resume analysis results</h2>
              <Button variant="primary" onClick={startInterview}>Start interview</Button>
            </div>

            <div className={styles.analysisGrid}>
              {/* ATS Score */}
              <Card className={styles.atsCard}>
                <div className={styles.atsLabel}>ATS score</div>
                <div className={styles.atsCircle}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke={getScoreColor(analysis.atsScore)} strokeWidth="8"
                      strokeDasharray={circumference} strokeDashoffset={offset}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className={styles.atsNumOverlay}>
                    <span className={styles.atsNum} style={{ color: getScoreColor(analysis.atsScore) }}>
                      {analysis.atsScore}
                    </span>
                    <span className={styles.atsPct}>/ 100</span>
                  </div>
                </div>
                <div className={styles.atsStatus}>{getScoreStatus(analysis.atsScore)}</div>
              </Card>

              {/* Summary */}
              <Card className={`${styles.infoCard} ${styles.summaryCard}`}>
                <h3>Summary</h3>
                <p>{analysis.summary}</p>
              </Card>

              {/* Strengths */}
              <Card className={styles.infoCard}>
                <h3><FaCheckCircle className={styles.iconGreen} /> Strengths</h3>
                <ul className={styles.list}>
                  {analysis.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </Card>

              {/* Improvements */}
              <Card className={styles.infoCard}>
                <h3><FaExclamationTriangle className={styles.iconAmber} /> Improvements</h3>
                <ul className={`${styles.list} ${styles.listAmber}`}>
                  {analysis.improvements?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </Card>

              {/* Questions */}
              <Card className={`${styles.infoCard} ${styles.questionsCard}`}>
                <h3>Interview questions ({analysis.questions?.length})</h3>
                <ul className={styles.qList}>
                  {analysis.questions?.map((q, i) => (
                    <li key={i} className={styles.qItem}>
                      <span className={styles.qNum}>Q{i + 1}</span>
                      <span className={styles.qText}>{q}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
