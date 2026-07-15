import { useRef } from 'react'
import styles from './ui.module.css'

/**
 * Reusable button with ripple effect.
 * variant: 'primary' | 'outline' | 'ghost'
 * onDark: flip colors for dark/navy backgrounds
 * as={Link} + to="/path" to render as a router link
 */
export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  onDark = false,
  children,
  className = '',
  as: Component = 'button',
  onClick,
  ...rest
}) {
  const btnRef = useRef(null)

  const handleClick = (e) => {
    // Ripple
    if (btnRef.current) {
      const btn = btnRef.current
      const circle = document.createElement('span')
      const diameter = Math.max(btn.clientWidth, btn.clientHeight)
      const rect = btn.getBoundingClientRect()
      circle.style.cssText = `
        width: ${diameter}px; height: ${diameter}px;
        left: ${e.clientX - rect.left - diameter / 2}px;
        top: ${e.clientY - rect.top - diameter / 2}px;
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.25);
        transform: scale(0);
        animation: ripple 0.5s ease-out;
        pointer-events: none;
      `
      const existing = btn.querySelector('span.rippleEl')
      if (existing) existing.remove()
      circle.className = 'rippleEl'
      btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.appendChild(circle)
      setTimeout(() => circle.remove(), 600)
    }
    onClick && onClick(e)
  }

  return (
    <Component
      ref={btnRef}
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${onDark ? styles[`btn-${variant}-onDark`] : ''} ${className}`}
      disabled={Component === 'button' ? disabled || loading : undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? <span className={styles.spinner} /> : null}
      {children}
    </Component>
  )
}
