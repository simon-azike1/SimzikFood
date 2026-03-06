import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#F5C518]/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F5C518] to-[#C9A000] flex items-center justify-center text-[#0D0D0D] font-black text-xl font-display shadow-lg shadow-[#F5C518]/20">
                A
              </div>
              <div>
                <div className="font-display font-extrabold text-[#F5C518] text-xl leading-none">AZIKE</div>
                <div className="text-[10px] tracking-[3px] text-white/30 uppercase">Restaurant</div>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-[220px]">
              Authentic West African cuisine cooked with love, served across Rabat & Casablanca.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-xs tracking-[2px] uppercase mb-5">Quick Links</h4>
            {[
              ['/',         'Home'],
              ['/menu',     'Our Menu'],
              ['/services', 'Services'],
              ['/about',    'About Us'],
              ['/contact',  'Contact'],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className="block text-white/45 text-sm mb-2.5 hover:text-[#F5C518] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-xs tracking-[2px] uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/212751780853"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-white/45 text-sm hover:text-[#25D366] transition-colors"
              >
                <span>📱</span> +212 751 780853
              </a>
              <a
                href="mailto:azikeshinye@gmail.com"
                className="flex items-center gap-2.5 text-white/45 text-sm hover:text-[#F5C518] transition-colors"
              >
                <span>✉️</span> azikeshinye@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-white/45 text-sm">
                <span>📍</span> Rabat & Casablanca, Morocco
              </div>
            </div>
          </div>

          {/* Order info */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-xs tracking-[2px] uppercase mb-5">Order Info</h4>
            <div className="flex items-center gap-2 text-[#F5C518] font-semibold text-sm mb-3">
              <span>⏰</span> Order 24h in Advance
            </div>
            <p className="text-white/40 text-sm mb-4">Delivery fee varies by distance.</p>
            <div className="space-y-1.5 text-white/45 text-sm">
              <div>🏙️ Rabat</div>
              <div>🏙️ Casablanca</div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/5 pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Azike Restaurant. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-white/15 text-xs hover:text-[#F5C518]/40 transition-colors"
          >
            Admin
          </Link>
        </div>

      </div>
    </footer>
  )
}
