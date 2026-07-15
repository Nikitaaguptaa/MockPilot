import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import { FaFileAlt, FaBullseye, FaComments, FaChartLine, FaTimes, FaPlus } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import IconCircle from '../../components/ui/IconCircle'
import PracticeDoodle from '../../components/ui/PracticeDoodle'
import womanDashboard from '../../assets/Woman_Dashboard.json'
import styles from './Home.module.css'

const WHY_STATS = [
  { value: '5', label: 'QUESTIONS PER SESSION', desc: 'Generated fresh from your resume and target role — never a generic question bank.' },
  { value: '0', label: 'GENERIC TEMPLATES', desc: 'Every question set is built from what your resume actually says, not a fixed list.' },
  { value: '<60s', label: 'TO YOUR FIRST QUESTION', desc: 'Upload, get your ATS score, and start answering — no setup, no waiting.' },
  { value: '∞', label: 'SESSIONS, NO LIMIT', desc: 'Practice as many roles and resumes as you want. Every session is saved to your history.' },
]

const COMPARISON_OTHER = [
  'One-size-fits-all question banks',
  'No resume-specific feedback',
  'Scores you have to interpret yourself',
  'No record of past attempts',
]
const COMPARISON_MOCKPILOT = [
  'Questions generated from your resume',
  'Feedback tied to what you actually wrote',
  'A plain-language score and a tip, every answer',
  'Full history and performance trends saved',
]

const STEPS = [
  { num: '01', title: 'Upload your resume', desc: 'Add your PDF resume and let AI read your skills, experience, and ATS compatibility.', icon: <FaFileAlt /> },
  { num: '02', title: 'Get tailored questions', desc: 'Receive five interview questions generated for your resume and target role.', icon: <FaBullseye /> },
  { num: '03', title: 'Answer and get feedback', desc: 'Respond to each question and receive a score with specific tips to improve.', icon: <FaComments /> },
  { num: '04', title: 'Track your progress', desc: 'Review past sessions and watch your interview performance improve over time.', icon: <FaChartLine /> },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className={styles.page}>

      {/* Hero — Lottie LEFT, text RIGHT */}
      <section className={styles.hero}>

        <div className={styles.heroLeft}>
          <Lottie
            animationData={womanDashboard}
            loop={true}
            className={styles.heroLottie}
          />
        </div>

        <div className={styles.heroRight}>
          <h1>
            Walk into your next interview
            <br />
            <span className={styles.heroHighlight}>already prepared.</span>
          </h1>

          <p className={styles.heroSub}>
            Upload your resume, answer a few questions made for the role you actually want,
            and find out what's working and what isn't — before the real interview does.
          </p>

          <div className={styles.heroBtns}>
            {user ? (
              <Button as={Link} to="/dashboard" variant="primary" onDark>Go to dashboard</Button>
            ) : (
              <>
                <Button as={Link} to="/signup" variant="primary" onDark>Start practicing free</Button>
                <Button as={Link} to="/login" variant="outline" onDark>Login</Button>
              </>
            )}
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}><strong>AI-powered</strong><span>question generation</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>Real-time</strong><span>feedback &amp; scoring</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>Free</strong><span>to use</span></div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.steps}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>How it works</span>
            <h2>Four steps to interview confidence</h2>
            <p>A simple process built around one goal — better answers, every time.</p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <IconCircle tone="blue">{step.icon}</IconCircle>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MockPilot */}
      <section className={styles.why}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>Why MockPilot</span>
            <h2>Practice that's actually about you</h2>
            <p>Not a fixed question bank — every session is built from your resume.</p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyStats}>
              {WHY_STATS.map((stat) => (
                <div key={stat.label} className={styles.whyStatCard}>
                  <div className={styles.whyStatValue}>{stat.value}</div>
                  <div className={styles.whyStatLabel}>{stat.label}</div>
                  <p>{stat.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.whyVisual}>
              <PracticeDoodle className={styles.doodle} />
            </div>
          </div>

          <div className={styles.compareWrap}>
            <div className={styles.compareCol}>
              <span className={styles.compareTag}>Generic prep</span>
              <ul className={styles.compareList}>
                {COMPARISON_OTHER.map((item) => (
                  <li key={item}><FaTimes className={styles.compareIconBad} />{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.compareVs}>vs</div>
            <div className={`${styles.compareCol} ${styles.compareColActive}`}>
              <span className={styles.compareTag}>MockPilot</span>
              <ul className={styles.compareList}>
                {COMPARISON_MOCKPILOT.map((item) => (
                  <li key={item}><FaPlus className={styles.compareIconGood} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <span className={styles.sectionLabel}>Get started</span>
          <h2>Ready to crack your next interview?</h2>
          <p>Join now and start practicing with AI feedback — completely free.</p>
          <Button as={Link} to="/signup" variant="primary" onDark className={styles.ctaBtn}>
            Start practicing free
          </Button>
        </div>
      </section>

    </div>
  )
}