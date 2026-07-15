import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/** Wrap any route element with this to require login; redirects to /login otherwise. */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}
