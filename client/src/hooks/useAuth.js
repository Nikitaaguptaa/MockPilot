import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/** Access the logged-in user, login(), and logout(). Must be used inside <AuthProvider>. */
export function useAuth() {
  return useContext(AuthContext)
}
