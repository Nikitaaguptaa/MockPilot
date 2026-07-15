import styles from './ui.module.css'

/** Simple bordered surface used throughout the app. */
export default function Card({ children, className = '', hoverable = true, ...rest }) {
  return (
    <div className={`${styles.card} ${hoverable ? styles.cardHoverable : ''} ${className}`} {...rest}>
      {children}
    </div>
  )
}
