import styles from './ui.module.css'

/** Label + input wrapper, keeps form markup consistent across Login/Signup/Dashboard. */
export default function FormField({ label, children }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
    </div>
  )
}
