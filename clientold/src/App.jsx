import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/routing/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Interview from './pages/Interview/Interview'
import History from './pages/History/History'
import EditProfile from './pages/Profile/EditProfile'
import Resume from './pages/Profile/Resume'
import Performance from './pages/Profile/Performance'
import Settings from './pages/Profile/Settings'
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/profile/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
          <Route path="/profile/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
          <Route path="/profile/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
