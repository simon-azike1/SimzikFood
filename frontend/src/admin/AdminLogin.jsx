import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

export default function AdminLogin() {
  const [creds,   setCreds]   = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleLogin = async () => {
    if (!creds.email || !creds.password) { toast.error('Enter email and password'); return }
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', creds)
      login(res.data.token, res.data.email)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 focus:border-[#F5C518] text-white placeholder-white/25 px-4 py-3.5 rounded-xl outline-none transition-colors'

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-5"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,197,24,0.05), #0D0D0D)' }}
    >
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F5C518] to-[#C9A000] flex items-center justify-center text-[#0D0D0D] font-black text-2xl font-display shadow-2xl shadow-[#F5C518]/20">
            A
          </div>
          <h1 className="font-display font-bold text-[#F5C518] text-xl mb-1">Admin Dashboard</h1>
          <p className="text-white/35 text-sm">AfriDish</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-[#F5C518]/15 rounded-2xl p-9">
          <div className="mb-5">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">email</label>
            <input
              type="text"
              placeholder="admin"
              value={creds.email}
              onChange={e => setCreds({ ...creds, email: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className={inputClass}
            />
          </div>
          <div className="mb-7">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={creds.password}
              onChange={e => setCreds({ ...creds, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className={inputClass}
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/20 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>
        </div>

        <p className="text-center text-white/20 text-xs mt-5">
          Default: admin / admin123 — change after first login
        </p>
      </div>
    </div>
  )
}