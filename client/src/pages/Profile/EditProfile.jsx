import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import api from '../../api'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import IconCircle from '../../components/ui/IconCircle'
import styles from './Profile.module.css'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user, login } = useAuth()

  const [form, setForm] = useState({ name: '', bio: '', targetRole: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    api.get('/profile/me')
      .then(({ data }) => {
        setForm({ name: data.name || '', bio: data.bio || '', targetRole: data.targetRole || '' })
      })
      .catch(() => setError('Could not load your profile.'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const { data } = await api.put('/profile/me', form)
      // Keep the navbar/drawer's cached user name+email in sync with what was just saved.
      const token = localStorage.getItem('token')
      login(token, { ...user, name: data.name })
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className={styles.header}>
          <IconCircle tone="blue" size={44}><FaUser /></IconCircle>
          <div>
            <h1>Edit profile</h1>
            <p>Update how you appear across MockPilot</p>
          </div>
        </div>

        <Card className={styles.formCard}>
          {loading ? (
            <p className="text-muted">Loading your profile...</p>
          ) : (
            <form onSubmit={submit} className={styles.form}>
              <FormField label="Full name">
                <input name="name" value={form.name} onChange={handleChange} required />
              </FormField>

              <FormField label="Email">
                <input value={user?.email || ''} disabled />
                <small className={styles.helpText}>Email can't be changed here.</small>
              </FormField>

              <FormField label="Target role">
                <input
                  name="targetRole"
                  placeholder="e.g. Full Stack Developer"
                  value={form.targetRole}
                  onChange={handleChange}
                />
              </FormField>

              <FormField label="Short bio">
                <textarea
                  name="bio"
                  rows={4}
                  placeholder="A line or two about your background..."
                  value={form.bio}
                  onChange={handleChange}
                />
              </FormField>

              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}

              <Button type="submit" variant="primary" loading={saving} className={styles.saveBtn}>
                {saving ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
