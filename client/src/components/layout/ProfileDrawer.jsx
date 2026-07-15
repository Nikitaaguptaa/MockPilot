import { useNavigate } from 'react-router-dom'
import {
  FaUser,
  FaHistory,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaFileAlt,
} from 'react-icons/fa'
import styles from './ProfileDrawer.module.css'

export default function ProfileDrawer({ isOpen, onClose, user, onLogout }) {
  const navigate = useNavigate()
  if (!isOpen) return null

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'U'

  const goTo = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.drawer}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className={styles.profileSection}>
          <div className={styles.avatar}>{initials}</div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>

        <div className={styles.menu}>
          <button onClick={() => goTo('/profile/edit')}>
            <FaUser />
            Edit profile
          </button>
          <button onClick={() => goTo('/profile/resume')}>
            <FaFileAlt />
            Resume
          </button>
          <button onClick={() => goTo('/history')}>
            <FaHistory />
            Interview history
          </button>
          <button onClick={() => goTo('/profile/performance')}>
            <FaChartBar />
            Performance
          </button>
          <button onClick={() => goTo('/profile/settings')}>
            <FaCog />
            Settings
          </button>
          <button className={styles.logout} onClick={onLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <div className={styles.footer}>
          MockPilot
          <br />
          Version 1.0
        </div>
      </div>
    </>
  )
}
