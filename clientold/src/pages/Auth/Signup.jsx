import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import FormField from '../../components/ui/FormField'
import styles from './Auth.module.css'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      const { data } = await axios.post('/api/auth/signup', form)
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authLeft}>
        <h2>Your next offer starts with a confident answer.</h2>
        <p>
          Create a free account, upload your resume, and get role-specific questions
          generated for you in seconds.
        </p>
        <div className={styles.authQuote}>
          <p>
            "I walked into my SDE-2 interview already knowing what to expect — that
            confidence showed."
          </p>
          <div className={styles.authQuoteName}>— A MockPilot user</div>
        </div>
      </div>

      <div className={styles.authRight}>
        <div className={styles.authBox}>
          <div className={styles.authHeader}>
            <h1>Create your account</h1>
            <p>Start your interview preparation, free</p>
          </div>

          <form onSubmit={submit} className={styles.form}>
            <FormField label="Full name">
              <input
                name="name"
                placeholder="Nikita Gupta"
                value={form.name}
                onChange={handleChange}
                required
              />
            </FormField>
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
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </FormField>

            {error && <p className="error-msg">{error}</p>}

            <Button type="submit" variant="primary" loading={loading} className={styles.submitBtn}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className={styles.authSwitch}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
