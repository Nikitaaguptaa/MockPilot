/**
 * Shared scoring helpers — used by Dashboard (ATS score), Interview (answer score out of 10),
 * and History (session score) so the color/label logic lives in exactly one place.
 */

/** Returns a CSS color var name for a 0-100 style percentage score. */
export function getScoreColor(score) {
  if (score >= 70) return 'var(--green)'
  if (score >= 50) return 'var(--blue)'
  return 'var(--red)'
}

/** Human label for a 0-100 percentage score (resume / overall performance). */
export function getScoreStatus(score) {
  if (score >= 70) return 'Strong'
  if (score >= 50) return 'Needs improvement'
  return 'Needs major work'
}

/** Color for a single answer score out of 10 (used during the live interview). */
export function getAnswerScoreColor(scoreOutOfTen) {
  if (scoreOutOfTen >= 7) return 'var(--green)'
  if (scoreOutOfTen >= 5) return 'var(--blue)'
  return 'var(--red)'
}
