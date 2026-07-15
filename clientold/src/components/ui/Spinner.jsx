import styles from './ui.module.css'

export default function Spinner({ size = 18, color = 'currentColor' }) {
  return (
    <span
      className={styles.spinnerStandalone}
      style={{ width: size, height: size, borderTopColor: color }}
    />
  )
}
