import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBullseye, FaCalendarAlt, FaPlus, FaArrowRight, FaTimes, FaCheckCircle, FaExclamationTriangle, FaComments } from 'react-icons/fa'
import api from '../../api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import { getScoreColor, getScoreStatus, getAnswerScoreColor } from '../../utils/score'
import { HistoryAnimation } from '../../components/ui/LottieAnim'
import styles from './History.module.css'

export default function History() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/interviews/history')
      .then((r) => setInterviews(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const withScore = interviews.filter((i) => i.score)
  const withAts = interviews.filter((i) => i.atsScore)

  const avgScore = withScore.length
    ? Math.round(withScore.reduce((a, b) => a + b.score, 0) / withScore.length)
    : 0
  const avgAts = withAts.length
    ? Math.round(withAts.reduce((a, b) => a + b.atsScore, 0) / withAts.length)
    : 0
  const totalAnswered = interviews.reduce((a, b) => a + (b.answers?.length || 0), 0)

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <span className={styles.tag}>Interview history</span>
            <h1>Your progress</h1>
            <p>Track and review all your mock interview sessions</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            <FaPlus /> New interview
          </Button>
        </div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <Spinner size={36} color="var(--navy)" />
            <p>Loading your history...</p>
          </div>
        ) : interviews.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}><FaBullseye /></div>
            <h2>No interviews yet</h2>
            <p>Complete your first mock interview to see your history and progress here.</p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Start first interview <FaArrowRight />
            </Button>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div className={styles.statsRow}>
              <Card className={styles.statCard}>
                <div className={styles.statNum}>{interviews.length}</div>
                <div className={styles.statLabel}>Total sessions</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--blue)' }}>{avgScore}%</div>
                <div className={styles.statLabel}>Avg score</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--green)' }}>{totalAnswered}</div>
                <div className={styles.statLabel}>Questions answered</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--navy)' }}>{avgAts}%</div>
                <div className={styles.statLabel}>Avg ATS score</div>
              </Card>
            </div>

            <div className={styles.grid}>
              {interviews.map((iv) => {
                const score = iv.score || iv.atsScore
                return (
                  <Card key={iv._id} className={styles.card} onClick={() => setSelected(iv)}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardLeft}>
                        <Badge tone="blue">{iv.role}</Badge>
                        <h3>{iv.role} Interview</h3>
                        <p className={styles.date}>
                          <FaCalendarAlt />
                          {new Date(iv.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      {score ? (
                        <div
                          className={styles.scoreCircle}
                          style={{ borderColor: getScoreColor(score) }}
                        >
                          <span className={styles.scoreNum} style={{ color: getScoreColor(score) }}>
                            {score}%
                          </span>
                          <span className={styles.scoreLabel} style={{ color: getScoreColor(score) }}>
                            {getScoreStatus(score)}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {iv.resumeAnalysis && <p className={styles.summary}>{iv.resumeAnalysis}</p>}

                    <div className={styles.cardStats}>
                      <div className={styles.cStat}>
                        <span>Questions</span>
                        <strong>{iv.questions?.length || 0}</strong>
                      </div>
                      <div className={styles.cDivider} />
                      <div className={styles.cStat}>
                        <span>Answered</span>
                        <strong>{iv.answers?.length || 0}</strong>
                      </div>
                      <div className={styles.cDivider} />
                      <div className={styles.cStat}>
                        <span>ATS score</span>
                        <strong style={{ color: iv.atsScore ? getScoreColor(iv.atsScore) : 'var(--ink-soft)' }}>
                          {iv.atsScore ? `${iv.atsScore}%` : '—'}
                        </strong>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* Detail modal */}
        {selected && (
          <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setSelected(null)} aria-label="Close">
                <FaTimes />
              </button>

              <div className={styles.modalHeader}>
                <Badge tone="blue">{selected.role}</Badge>
                <h2>{selected.role} Interview</h2>
                <p className={styles.date}>
                  <FaCalendarAlt />
                  {new Date(selected.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>

              <div className={styles.modalScores}>
                <div className={styles.modalScoreBox}>
                  <span className={styles.modalScoreLabel}>ATS score</span>
                  <span
                    className={styles.modalScoreNum}
                    style={{ color: selected.atsScore ? getScoreColor(selected.atsScore) : 'var(--ink-soft)' }}
                  >
                    {selected.atsScore ? `${selected.atsScore}%` : '—'}
                  </span>
                </div>
                <div className={styles.modalScoreBox}>
                  <span className={styles.modalScoreLabel}>Interview score</span>
                  <span
                    className={styles.modalScoreNum}
                    style={{ color: selected.score ? getScoreColor(selected.score) : 'var(--ink-soft)' }}
                  >
                    {selected.score ? `${selected.score}%` : '—'}
                  </span>
                </div>
              </div>

              {selected.resumeAnalysis && (
                <div className={styles.modalSection}>
                  <h3>Summary</h3>
                  <p>{selected.resumeAnalysis}</p>
                </div>
              )}

              {selected.strengths?.length > 0 && (
                <div className={styles.modalSection}>
                  <h3><FaCheckCircle className={styles.iconGreen} /> Strengths</h3>
                  <ul className={styles.modalList}>
                    {selected.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {selected.improvements?.length > 0 && (
                <div className={styles.modalSection}>
                  <h3><FaExclamationTriangle className={styles.iconAmber} /> Improvements</h3>
                  <ul className={`${styles.modalList} ${styles.modalListAmber}`}>
                    {selected.improvements.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {selected.questions?.length > 0 && (
                <div className={styles.modalSection}>
                  <h3><FaComments /> Questions & answers</h3>
                  <ul className={styles.modalQAList}>
                    {selected.questions.map((q, i) => (
                      <li key={i} className={styles.modalQAItem}>
                        <div className={styles.modalQ}>
                          <span className={styles.qNum}>Q{i + 1}</span>
                          {q}
                        </div>
                        {selected.answers?.[i] && (
                          <div className={styles.modalA}>{selected.answers[i]}</div>
                        )}
                        {selected.feedback?.[i] && (
                          <div className={styles.modalFeedback}>{selected.feedback[i]}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
