import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Menu Card ─── */
function MenuCard({ item }) {
  const EMOJI = { main: '🍽️', stews: '🥘', soups: '🍲', sides: '🌽', drinks: '🥤' }
  return (
    <div className="card-hover bg-[#1A1A1A] border border-[#F5C518]/10 rounded-2xl overflow-hidden relative flex flex-col">
      {item.featured && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#F5C518] to-[#C9A000] text-[#0D0D0D] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
          ⭐ Featured
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 shrink-0 bg-[#F5C518]/8 border border-[#F5C518]/15 rounded-xl flex items-center justify-center text-xl">
            {EMOJI[item.category] || '🍽️'}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg leading-snug mb-1">{item.name}</h3>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#40916C]">{item.category}</span>
          </div>
        </div>
        {item.description && (
          <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{item.description}</p>
        )}
        <div className={`grid gap-2 mb-4 ${item.familyPrice ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <div className="bg-[#F5C518]/6 border border-[#F5C518]/20 rounded-xl p-3">
            <div className="text-[10px] text-white/35 font-semibold uppercase tracking-wide mb-1">{item.singleLabel || 'Single'}</div>
            <div className="font-display font-extrabold text-[#F5C518] text-xl leading-none">{item.singlePrice} <span className="text-xs text-[#F5C518]/50">MAD</span></div>
          </div>
          {item.familyPrice && (
            <div className="bg-[#2D6A4F]/10 border border-[#40916C]/25 rounded-xl p-3">
              <div className="text-[10px] text-white/35 font-semibold uppercase tracking-wide mb-1">{item.familyLabel || 'Family'}</div>
              <div className="font-display font-extrabold text-[#40916C] text-xl leading-none">{item.familyPrice} <span className="text-xs text-[#40916C]/50">MAD</span></div>
            </div>
          )}
        </div>
        <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 border border-[#25D366]/25 rounded-xl text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/20 transition-all hover:-translate-y-0.5">
          📱 Order via WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ─── Fallback data ─── */
const FALLBACK = [
  { _id: '1', name: 'Jollof Rice', category: 'main', description: 'A flavorful West African classic, slow-cooked with vibrant peppers, onions and aromatic spices.', singlePrice: 60, familyPrice: 120, singleLabel: 'Single Meal (~1L)', familyLabel: 'Family Pack (4-6)', featured: true },
  { _id: '2', name: 'Chicken Stew', category: 'stews', description: 'Rich, hearty, and aromatic tomato-based stew with tender chicken pieces.', singlePrice: 70, familyPrice: 130, singleLabel: 'Single Portion', familyLabel: 'Family Size', featured: true },
]

/* ════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════ */
export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/api/menu?featured=true')
      .then(r => setFeatured(r.data))
      .catch(() => setFeatured([]))
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 70% 40%, rgba(245,197,24,0.07) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(45,106,79,0.09) 0%, transparent 50%)',
          paddingTop: '80px',
        }}
      >
        {/* dot grid */}
        <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
        {/* decorative rings */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#F5C518]/6 pointer-events-none" />
        <div className="absolute right-[-180px] top-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-[#F5C518]/3 pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full px-6 md:px-10 relative z-10 py-20">
          <div className="max-w-xl">

            {/* tag */}
            <div className="animate-fadeInUp mb-5">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full">
                🌍 West African Cuisine
              </span>
            </div>

            {/* headline */}
            <h1
              className="font-display font-black leading-[1.08] mb-6 animate-fadeInUp"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', animationDelay: '0.1s' }}
            >
              Taste the{' '}
              <span className="shimmer-text">Authentic</span>
              <br />Flavors of Africa
            </h1>

            {/* sub */}
            <p
              className="text-white/55 text-base md:text-lg leading-relaxed mb-10 animate-fadeInUp"
              style={{ animationDelay: '0.2s' }}
            >
              From smoky Jollof Rice to rich Chicken Stew — homemade, hearty West African
              dishes delivered to your door in Rabat & Casablanca.
            </p>

            {/* buttons */}
            <div className="flex flex-wrap gap-4 mb-14 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link to="/menu"
                className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/20">
                🍽️ Explore Menu
              </Link>
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0D0D0D] font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5">
                📱 Order on WhatsApp
              </a>
            </div>

            {/* stats */}
            <div className="flex flex-wrap gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              {[
                ['🏙️', 'Rabat & Casablanca', 'Delivery Areas'],
                ['⏰', '24h Notice',           'Order in Advance'],
                ['🥘', '6+ Dishes',            'On The Menu'],
              ].map(([icon, main, sub]) => (
                <div key={main} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#F5C518] text-sm leading-tight">{main}</div>
                    <div className="text-[10px] text-white/35 uppercase tracking-widest">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ ORDER BANNER ══════════ */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] border-y border-[#40916C]/30 py-4">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 font-semibold text-sm">
            <span className="text-lg">⏰</span>
            Order 24 hours in advance for freshly prepared meals
          </div>
          <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
            className="bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-5 py-2 rounded-xl text-sm transition-colors">
            Order Now →
          </a>
        </div>
      </div>

      {/* ══════════ FEATURED MENU ══════════ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
                ⭐ Most Popular
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">Our Signature Dishes</h2>
              <p className="text-white/45 text-base max-w-md">
                Slow-cooked, spice-perfected West African classics.
              </p>
            </div>
            <Link to="/menu"
              className="self-start md:self-auto inline-flex items-center gap-2 border border-[#F5C518]/40 text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0D0D0D] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap">
              View Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featured.length > 0 ? featured : FALLBACK).map(item => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════ WHY US ══════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
              Why Azike
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Made with Passion,<br />Served with Pride
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🫙', title: 'Homemade Quality',  desc: 'Every dish made fresh with authentic ingredients and traditional West African recipes.' },
              { icon: '🌶️', title: 'Bold Flavors',       desc: 'Rich spices, slow-cooked perfection and balanced seasoning in every serving.' },
              { icon: '🚚', title: 'Home Delivery',      desc: 'We deliver across Rabat and Casablanca. Delivery fee varies by location.' },
              { icon: '📦', title: 'Generous Portions',  desc: 'Single meals in ~1L containers. Family packs with 4–6 pieces of chicken.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card-hover bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#F5C518]/8 border border-[#F5C518]/15 flex items-center justify-center text-2xl group-hover:bg-[#F5C518]/15 transition-colors">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-[#F5C518] text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════ HOW TO ORDER ══════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-14">Order in 3 Simple Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📋', title: 'Browse the Menu',   desc: 'Check our dishes and pick your favourites — single or family size.' },
              { step: '02', icon: '📱', title: 'Place Your Order',   desc: 'WhatsApp or email us your order with your address, 24h ahead.' },
              { step: '03', icon: '🚚', title: 'Receive & Enjoy',    desc: 'Your freshly cooked meal arrives hot and ready to eat!' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#F5C518]/20 flex items-center justify-center text-2xl mb-4">
                  {icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5C518] text-[#0D0D0D] text-[10px] font-black flex items-center justify-center">
                    {step}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-20 border-t border-[#F5C518]/10"
        style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.04) 0%, rgba(45,106,79,0.06) 100%)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold mb-4 text-3xl md:text-5xl">Ready to Order?</h2>
          <p className="text-white/50 text-base mb-8 leading-relaxed">
            Message us on WhatsApp — remember to order at least 24 hours ahead for fresh preparation!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-8 py-4 rounded-2xl text-base transition-all hover:-translate-y-1 shadow-xl shadow-[#F5C518]/15">
              📱 +212 751 780853
            </a>
            <a href="mailto:azikeshinye@gmail.com"
              className="inline-flex items-center gap-3 border-2 border-white/20 text-white/70 hover:border-[#F5C518] hover:text-[#F5C518] font-bold px-8 py-4 rounded-2xl text-base transition-all hover:-translate-y-1">
              ✉️ Send Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
