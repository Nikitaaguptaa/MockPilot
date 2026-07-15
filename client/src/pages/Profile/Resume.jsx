import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaFileAlt, FaPlus, FaFilePdf } from 'react-icons/fa'
import api from '../../api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import IconCircle from '../../components/ui/IconCircle'
import Spinner from '../../components/ui/Spinner'
import styles from './Profile.module.css'

export default function Resume() {
  const navigate = useNavigate()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    api.get('/profile/me/resume')
      .then(({ data }) => setResume(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const hasResume = resume?.resumeText

  // The PDF endpoint needs the auth header, so we fetch it as a blob here
  // rather than just linking to the URL directly, then open that blob.
  const viewPdf = async () => {
    setOpening(true)
    try {
      const res = await api.get('/profile/me/resume/file', { responseType: 'blob' })
      const url = window.URL.createObjectURL(res.data)
      window.open(url, '_blank')
    } catch {
      // no-op — if there's no file saved yet the button is hidden anyway
    } finally {
      setOpening(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className={styles.header}>
          <IconCircle tone="blue" size={44}><FaFileAlt /></IconCircle>
          <div>
            <h1>Resume</h1>
            <p>The most recent resume you analyzed on MockPilot</p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <Spinner size={32} color="var(--navy)" />
          </div>
        ) : !hasResume ? (
          <Card className={styles.emptyCard}>
            <FaFileAlt className={styles.emptyIcon} />
            <h2>No resume saved yet</h2>
            <p>Upload a resume from your dashboard to see it stored here for next time.</p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              <FaPlus /> Go to dashboard
            </Button>
          </Card>
        ) : (
          <>
            <Card className={styles.resumeMetaCard}>
              <div>
                <div className={styles.resumeFileName}>{resume.resumeFileName || 'resume.pdf'}</div>
                <div className={styles.resumeMeta}>
                  Last analyzed on{' '}
                  {new Date(resume.resumeUpdatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </div>
              </div>
              <div className={styles.resumeActions}>
                {resume.hasFile && (
                  <Button variant="primary" onClick={viewPdf} loading={opening}>
                    <FaFilePdf /> View PDF
                  </Button>
                )}
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Upload a new one
                </Button>
              </div>
            </Card>

            <Card className={styles.resumeTextCard}>
              <h3>Extracted text</h3>
              <p className={styles.resumeHint}>
                This is the raw text MockPilot read from your PDF to generate questions and your ATS score.
              </p>
              <pre className={styles.resumeText}>{resume.resumeText}</pre>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
