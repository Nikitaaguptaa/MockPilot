import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCog, FaLock } from 'react-icons/fa'
import api from '../../api'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import IconCircle from '../../components/ui/IconCircle'
import styles from './Profile.module.css'

export default function Settings() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    setSaving(true)
    try {
      await api.put('/profile/me/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setSuccess('Password updated. Please log in again with your new password.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update password')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className={styles.header}>
          <IconCircle tone="blue" size={44}><FaCog /></IconCircle>
          <div>
            <h1>Settings</h1>
            <p>Manage your account security</p>
          </div>
        </div>

        <Card className={styles.formCard}>
          <h3 className={styles.sectionTitle}><FaLock /> Change password</h3>

          <form onSubmit={submit} className={styles.form}>
            <FormField label="Current password">
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField label="New password">
              <input
                type="password"
                name="newPassword"
                placeholder="Min. 6 characters"
                value={form.newPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </FormField>
            <FormField label="Confirm new password">
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormField>

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <Button type="submit" variant="primary" loading={saving} className={styles.saveBtn}>
              {saving ? 'Updating...' : 'Update password'}
            </Button>
          </form>
        </Card>

        <Card className={styles.dangerCard}>
          <div>
            <h3 className={styles.sectionTitle}>Log out everywhere</h3>
            <p className={styles.helpText}>This will sign you out of MockPilot on this device.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </Card>
      </div>
    </div>
  )
}
