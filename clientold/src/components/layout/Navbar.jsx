import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaChevronUp } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import ProfileDrawer from './ProfileDrawer'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <>
      <nav className={styles.nav}>
        {/* Brand mark is intentionally not a link — "Home" below is the explicit nav item */}
        <div className={styles.brand}>
          <span className={styles.logoMark}><FaChevronUp /></span>
          <span className={styles.brandName}>MockPilot</span>
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li>
            <Link
              to="/"
              className={isActive('/') ? styles.active : ''}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={isActive('/dashboard') ? styles.active : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className={isActive('/history') ? styles.active : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  History
                </Link>
              </li>
            </>
          )}
        </ul>

        {user ? (
          <div className={styles.right}>
            <button className={styles.profileButton} onClick={() => setDrawerOpen(true)}>
              <span className={styles.avatar}>{initials}</span>
              <span className={styles.profileInfo}>
                <span className={styles.profileName}>{user?.name}</span>
                <small>{user?.email}</small>
              </span>
            </button>
          </div>
        ) : (
          <div className={styles.right}>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/signup" className={styles.signupBtn}>Sign up</Link>
          </div>
        )}

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {user && (
        <ProfileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}