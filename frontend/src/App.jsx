import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './admin/AuthContext'

import Home     from './pages/Home'
import Menu     from './pages/Menu'
import About    from './pages/About'
import Contact  from './pages/Contact'
import Services from './pages/Services'

import AdminLogin     from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ProtectedRoute from './admin/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1E1E1E',
              color: '#FAFAF7',
              border: '1px solid rgba(245,197,24,0.3)',
              fontFamily: 'Outfit, sans-serif',
            },
            success: { iconTheme: { primary: '#F5C518', secondary: '#0D0D0D' } },
          }}
        />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/menu"        element={<Menu />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*"     element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}