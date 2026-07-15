import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrophy, FaRobot, FaLightbulb, FaCheck, FaHistory } from 'react-icons/fa'
import api from '../../api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'
import { getScoreColor, getAnswerScoreColor, getScoreStatus } from '../../utils/score'
import styles from './Interview.module.css'

export default function Interview() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('interviewData')
    if (!saved) { navigate('/dashboard'); return }
    const parsed = JSON.parse(saved)
    setData(parsed)
    const savedProgress = localStorage.getItem('interviewProgress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      if (progress.interviewId === parsed.interviewId) {
        setCurrent(progress.current || 0)
        setScores(progress.scores || [])
      }
    }
  }, [navigate])

  useEffect(() => {
    if (!data?.interviewId) return
    localStorage.setItem('interviewProgress', JSON.stringify({ interviewId: data.interviewId, current, scores }))
  }, [data, current, scores])

  if (!data) return null

  const questions = data.questions || []
  const total = questions.length
  const progressPct = ((current) / total) * 100

  const submitAnswer = async () => {
    if (!answer.trim()) return
    setLoading(true)
    try {
      const res = await api.post('/interview/answer', {
        interviewId: data.interviewId,
        question: questions[current],
        answer,
        questionIndex: current,
      })
      setFeedback(res.data)
      setScores([...scores, res.data.score])
    } catch {
      setFeedback({ feedback: 'Could not get AI feedback. Please check your API key.', score: 5, tip: 'Try again later.' })
      setScores([...scores, 5])
    } finally {
      setLoading(false)
    }
  }

  const goNext = () => {
    if (current + 1 >= total) {
      const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10)
      api.post('/interview/complete', { interviewId: data.interviewId, score: avg }).catch(() => {})
      localStorage.removeItem('interviewProgress')
      localStorage.removeItem('interviewData')
      setDone(true)
    } else {
      setCurrent(current + 1)
      setAnswer('')
      setFeedback(null)
    }
  }

  const avgScore = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) : 0

  if (done) {
    return (
      <div className={styles.doneWrap}>
        <Card className={styles.doneCard}>
          <FaTrophy className={styles.doneIcon} />
          <h1>Interview complete!</h1>
          <p>Great job finishing your mock interview session.</p>
          <div className={styles.finalScore} style={{ color: getScoreColor(avgScore) }}>
            {avgScore}<span>%</span>
          </div>
          <p className={styles.finalLabel}>{getScoreStatus(avgScore)} overall performance</p>
          <div className={styles.doneBtns}>
            <Button variant="primary" onClick={() => navigate('/history')}><FaHistory /> View history</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>New session</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressTop}>
            <span className={styles.progressLabel}>Mock interview</span>
            <span className={styles.progressCounter}>Question {current + 1} / {total}</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            {/* Chat conversation */}
            <div className={styles.chatWrap}>
              {/* AI question bubble */}
              <div className={styles.qBubble}>
                <div className={styles.qAvatar}>AI</div>
                <div className={styles.qBubbleInner}>
                  <div className={styles.qMeta}>
                    <span className={styles.qTag}>Q{current + 1}</span>
                    <span className={styles.roleTag}>Role: <span>{data.role}</span></span>
                  </div>
                  <h2>{questions[current]}</h2>
                </div>
              </div>

              {/* User answer area */}
              <div className={styles.answerWrap}>
                <label className={styles.answerLabel}>Your answer</label>
                <textarea
                  className={styles.textarea}
                  rows={6}
                  placeholder="Type your answer here... Be specific, use examples from your experience."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={!!feedback}
                />
                {!feedback && (
                  <Button
                    variant="primary"
                    loading={loading}
                    disabled={!answer.trim()}
                    onClick={submitAnswer}
                    className={styles.submitAnswerBtn}
                  >
                    {loading ? 'Getting AI feedback...' : 'Submit answer'}
                  </Button>
                )}
              </div>

              {/* AI feedback bubble */}
              {feedback && (
                <div className={styles.feedbackBubble}>
                  <div className={styles.qAvatar}><FaRobot /></div>
                  <div className={styles.feedbackInner}>
                    <div className={styles.feedbackTop}>
                      <h3>AI feedback</h3>
                      <div className={styles.scoreChip} style={{ color: getAnswerScoreColor(feedback.score), borderColor: getAnswerScoreColor(feedback.score) }}>
                        {feedback.score}/10
                      </div>
                    </div>
                    <p className={styles.feedbackText}>{feedback.feedback}</p>
                    <div className={styles.tipBox}>
                      <FaLightbulb className={styles.tipIcon} />
                      <span>{feedback.tip}</span>
                    </div>
                    <Button variant="primary" onClick={goNext} className={styles.nextBtn}>
                      {current + 1 >= total ? 'Finish interview' : 'Next question →'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <Card className={styles.sideCard}>
              <h3 className={styles.sideHeading}>All questions</h3>
              <ul className={styles.qListSide}>
                {questions.map((q, i) => (
                  <li key={i} className={`${styles.qSideItem} ${i === current ? styles.qSideActive : ''} ${i < current ? styles.qSideDone : ''}`}>
                    <span className={styles.qSideBadge}>{i < current ? <FaCheck /> : i + 1}</span>
                    <span>{q.length > 50 ? `${q.slice(0, 50)}...` : q}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {scores.length > 0 && (
              <Card className={styles.sideCard}>
                <h3 className={styles.sideHeading}>Scores so far</h3>
                <div className={styles.scoresSide}>
                  {scores.map((s, i) => (
                    <div key={i} className={styles.scoreRow}>
                      <span>Q{i + 1}</span>
                      <div className={styles.scoreBarWrap}>
                        <div className={styles.scoreBarFill} style={{ width: `${s * 10}%`, background: getAnswerScoreColor(s) }} />
                      </div>
                      <span>{s}/10</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
