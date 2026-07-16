import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import FormField from '../../components/ui/FormField'
import styles from './Auth.module.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authLeft}>
        <h2>Practice makes the difference between knowing and showing.</h2>
        <p>
          MockPilot helps you rehearse real interview questions for your exact role, with
          feedback that points out what to fix before the real thing.
        </p>
        <div className={styles.authQuote}>
          <p>
            "Answering five tailored questions told me more about my gaps than a week of
            generic prep."
          </p>
          <div className={styles.authQuoteName}>— A MockPilot user</div>
        </div>
      </div>

      <div className={styles.authRight}>
        <div className={styles.authBox}>
          <div className={styles.authHeader}>
            <h1>Welcome back</h1>
            <p>Login to continue your interview prep</p>
          </div>

          <form onSubmit={submit} className={styles.form}>
            <FormField label="Email address">
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField label="Password">
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </FormField>

            {error && <p className="error-msg">{error}</p>}

            <Button type="submit" variant="primary" loading={loading} className={styles.submitBtn}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className={styles.authSwitch}>
            Don't have an account? <Link to="/signup">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}