import styles from './ui.module.css'

/** A rounded color chip that wraps an icon — used in feature cards, side cards, etc. */
export default function IconCircle({ children, tone = 'blue', size = 38 }) {
  return (
    <div
      className={`${styles.iconCircle} ${styles[`iconCircle-${tone}`]}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  )
}
