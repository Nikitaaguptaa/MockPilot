import styles from './ui.module.css'

/** tone: 'blue' | 'green' | 'amber' | 'red' | 'navy' */
export default function Badge({ tone = 'blue', children, className = '' }) {
  return <span className={`${styles.badge} ${styles[`badge-${tone}`]} ${className}`}>{children}</span>
}
