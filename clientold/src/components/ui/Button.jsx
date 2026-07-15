import styles from './ui.module.css'

/**
 * Reusable button.
 * variant: 'primary' | 'outline' | 'ghost'
 * onDark: pass true when placing the button on a dark/navy background (e.g. the hero) —
 *   flips primary to a white pill and outline to a white-bordered pill, so it stays readable.
 * Pass `as={Link}` + `to="/path"` to render as a router link instead of a button.
 */
export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  onDark = false,
  children,
  className = '',
  as: Component = 'button',
  ...rest
}) {
  return (
    <Component
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${onDark ? styles[`btn-${variant}-onDark`] : ''} ${className}`}
      disabled={Component === 'button' ? disabled || loading : undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} /> : null}
      {children}
    </Component>
  )
}
