import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F5C518]/10 flex items-center justify-center shadow-lg shadow-[#F5C518]/15 overflow-hidden">
                <img src="/logo.png" alt="AfriDish" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <div className="font-bold text-[#F5C518] text-sm tracking-widest uppercase leading-none">AfriDish</div>
                <div className="text-[9px] tracking-[3px] text-white/20 uppercase mt-0.5">Restaurant</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-[210px]">
              Authentic West African cuisine cooked with love, delivered across Rabat & Casablanca.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/30 mb-5">Navigate</h4>
            <div className="space-y-2.5">
              {[
                ['/',         'Home'],
                ['/menu',     'Our Menu'],
                ['/services', 'Services'],
                ['/about',    'About Us'],
                ['/contact',  'Contact'],
              ].map(([path, label]) => (
                <Link key={path} to={path}
                  className="flex items-center gap-1.5 text-white/40 text-sm hover:text-[#F5C518] transition-colors group">
                  {label}
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/30 mb-5">Contact</h4>
            <div className="space-y-3.5">
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 text-white/40 text-sm hover:text-[#25D366] transition-colors">
                <Phone size={14} className="shrink-0" />
                +212 751 780853
              </a>
              <a href="mailto:azikeshinye@gmail.com"
                className="flex items-center gap-3 text-white/40 text-sm hover:text-[#F5C518] transition-colors">
                <Mail size={14} className="shrink-0" />
                azikeshinye@gmail.com
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                Rabat & Casablanca, Morocco
              </div>
            </div>
          </div>

          {/* Order info */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/30 mb-5">Order Info</h4>
            <div className="flex items-center gap-2.5 text-[#F5C518] font-semibold text-sm mb-3">
              <Clock size={14} />
              24h Advance Notice
            </div>
            <p className="text-white/30 text-xs leading-relaxed mb-4">
              Every meal is freshly prepared. Delivery fee varies by distance.
            </p>
            <div className="space-y-2">
              {['Rabat', 'Casablanca'].map(city => (
                <div key={city} className="flex items-center gap-2 text-white/35 text-xs">
                  <MapPin size={11} className="text-[#40916C]" />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} AfriDish. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-white/10 text-xs hover:text-white/25 transition-colors">
            Admin
          </Link>
        </div>

      </div>
    </footer>
  )
}