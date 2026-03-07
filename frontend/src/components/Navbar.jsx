import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'

const NAV_LINKS = [
  { path: '/',         label: 'Home'     },
  { path: '/menu',     label: 'Menu'     },
  { path: '/services', label: 'Services' },
  { path: '/about',    label: 'About'    },
  { path: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'py-3 bg-[#080808]/95 backdrop-blur-xl border-b border-[#F5C518]/10 shadow-xl shadow-black/40'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">

        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="AfriDish" className="h-10 w-auto object-contain" />
          <p className="ml-2 ">AfriDish</p>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'text-[#F5C518] bg-[#F5C518]/8'
                  : 'text-white/50 hover:text-white hover:bg-white/4'
              }`}>
              {link.label}
            </Link>
          ))}
          <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
            className="ml-4 flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/15">
            <MessageCircle size={14} />
            Order Now
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D]/98 backdrop-blur-xl border-t border-white/6 px-6 pt-4 pb-6 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-[#F5C518] bg-[#F5C518]/8'
                  : 'text-white/60 hover:text-white hover:bg-white/4'
              }`}>
              {link.label}
            </Link>
          ))}
          <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] py-3.5 rounded-full font-bold text-sm transition-all">
            <MessageCircle size={15} />
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}