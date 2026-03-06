import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#F5C518]/15 shadow-lg shadow-black/30'
          : 'py-5 bg-[#0D0D0D]/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5C518] to-[#C9A000] flex items-center justify-center text-[#0D0D0D] font-black text-lg font-display shadow-md shadow-[#F5C518]/25">
            A
          </div>
          <div>
            <div className="font-display font-extrabold text-[#F5C518] text-base leading-none tracking-wide">AZIKE</div>
            <div className="text-[9px] tracking-[4px] text-white/35 uppercase mt-0.5">Restaurant</div>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'text-[#F5C518] bg-[#F5C518]/10'
                  : 'text-white/65 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/212751780853"
            target="_blank"
            rel="noreferrer"
            className="ml-3 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md shadow-[#25D366]/20"
          >
            📱 Order Now
          </a>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-[#F5C518] text-xl rounded-lg hover:bg-white/5 transition-colors"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-white/8 px-6 pt-3 pb-5 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-[#F5C518] bg-[#F5C518]/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/212751780853"
            target="_blank"
            rel="noreferrer"
            className="mt-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-xl font-bold text-sm text-center transition-colors"
          >
            📱 Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
