import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaChartBar, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import api from '../../api'
import Card from '../../components/ui/Card'
import IconCircle from '../../components/ui/IconCircle'
import Spinner from '../../components/ui/Spinner'
import { getScoreColor } from '../../utils/score'
import styles from './Profile.module.css'

export default function Performance() {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/interviews/history')
      .then(({ data }) => setInterviews(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <Spinner size={32} color="var(--navy)" />
        </div>
      </div>
    )
  }

  const scored = interviews.filter((i) => i.score)
  const atsScored = interviews.filter((i) => i.atsScore)

  const avgScore = scored.length
    ? Math.round(scored.reduce((a, b) => a + b.score, 0) / scored.length)
    : 0
  const avgAts = atsScored.length
    ? Math.round(atsScored.reduce((a, b) => a + b.atsScore, 0) / atsScored.length)
    : 0

  // Compare the most recent half of sessions against the earlier half to show a trend.
  const sortedByDate = [...scored].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  const mid = Math.floor(sortedByDate.length / 2)
  const earlier = sortedByDate.slice(0, mid)
  const recent = sortedByDate.slice(mid)
  const earlierAvg = earlier.length ? earlier.reduce((a, b) => a + b.score, 0) / earlier.length : 0
  const recentAvg = recent.length ? recent.reduce((a, b) => a + b.score, 0) / recent.length : 0
  const trend = recentAvg - earlierAvg

  // Role breakdown
  const roleMap = {}
  interviews.forEach((iv) => {
    if (!roleMap[iv.role]) roleMap[iv.role] = { count: 0, totalScore: 0, scoredCount: 0 }
    roleMap[iv.role].count += 1
    if (iv.score) {
      roleMap[iv.role].totalScore += iv.score
      roleMap[iv.role].scoredCount += 1
    }
  })
  const roleStats = Object.entries(roleMap).map(([role, stats]) => ({
    role,
    count: stats.count,
    avg: stats.scoredCount ? Math.round(stats.totalScore / stats.scoredCount) : null,
  }))

  const maxBar = Math.max(...sortedByDate.map((i) => i.score), 10)

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className={styles.header}>
          <IconCircle tone="blue" size={44}><FaChartBar /></IconCircle>
          <div>
            <h1>Performance</h1>
            <p>How your interview scores have changed over time</p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <Card className={styles.emptyCard}>
            <FaChartBar className={styles.emptyIcon} />
            <h2>No data yet</h2>
            <p>Complete a few mock interviews to start seeing your performance trends here.</p>
          </Card>
        ) : (
          <>
            <div className={styles.statsRow}>
              <Card className={styles.statCard}>
                <div className={styles.statNum}>{interviews.length}</div>
                <div className={styles.statLabel}>Total sessions</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--blue)' }}>{avgScore}%</div>
                <div className={styles.statLabel}>Average score</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--navy)' }}>{avgAts}%</div>
                <div className={styles.statLabel}>Average ATS score</div>
              </Card>
              <Card className={styles.statCard}>
                <div className={styles.statNum} style={{ color: trend >= 0 ? 'var(--green)' : 'var(--red)' }}>
                  {trend >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(Math.round(trend))}%
                </div>
                <div className={styles.statLabel}>Recent trend</div>
              </Card>
            </div>

            {sortedByDate.length > 1 && (
              <Card className={styles.chartCard}>
                <h3>Score over time</h3>
                <div className={styles.barChart}>
                  {sortedByDate.map((iv, i) => (
                    <div key={iv._id} className={styles.barWrap}>
                      <div
                        className={styles.bar}
                        style={{
                          height: `${(iv.score / maxBar) * 100}%`,
                          background: getScoreColor(iv.score),
                        }}
                        title={`${iv.score}%`}
                      />
                      <span className={styles.barLabel}>{i + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className={styles.chartCard}>
              <h3>By role</h3>
              <div className={styles.roleList}>
                {roleStats.map((r) => (
                  <div key={r.role} className={styles.roleRow}>
                    <div className={styles.roleInfo}>
                      <span className={styles.roleName}>{r.role}</span>
                      <span className={styles.roleCount}>{r.count} session{r.count > 1 ? 's' : ''}</span>
                    </div>
                    {r.avg !== null && (
                      <div className={styles.roleBarWrap}>
                        <div
                          className={styles.roleBarFill}
                          style={{ width: `${r.avg}%`, background: getScoreColor(r.avg) }}
                        />
                      </div>
                    )}
                    <span className={styles.roleAvg} style={{ color: r.avg !== null ? getScoreColor(r.avg) : 'var(--ink-soft)' }}>
                      {r.avg !== null ? `${r.avg}%` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
