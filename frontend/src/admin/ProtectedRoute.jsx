import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-[#F5C518] text-lg">
      ⏳ Loading...
    </div>
  )

  if (!admin) return <Navigate to="/admin/login" replace />

  return children
}
