import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin,   setAdmin]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token    = localStorage.getItem('adminToken')
    const username = localStorage.getItem('adminUsername')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.get('/api/auth/verify')
        .then(() => setAdmin({ token, username }))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token, username) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminUsername', username)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setAdmin({ token, username })
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUsername')
    delete axios.defaults.headers.common['Authorization']
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
