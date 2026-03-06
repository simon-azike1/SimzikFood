import { useEffect, useState } from 'react'
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
          <div className="w-11 h-11 shrink-0 bg-[#F5C518]/8 border border-[#F5C518]/15 rounded-xl flex items-center justify-center text-xl">
            {EMOJI[item.category] || '🍽️'}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg leading-snug mb-0.5">{item.name}</h3>
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

/* ─── Category Tabs ─── */
const CATEGORIES = [
  { key: 'all',    label: '🍽️ All'         },
  { key: 'main',   label: '🌾 Main Dishes'  },
  { key: 'stews',  label: '🥘 Stews'        },
  { key: 'soups',  label: '🍲 Soups'        },
  { key: 'sides',  label: '🌽 Sides'        },
  { key: 'drinks', label: '🥤 Drinks'       },
]

/* ─── Fallback ─── */
const FALLBACK = [
  { _id: '1', name: 'Jollof Rice',             category: 'main',  description: 'A flavorful West African classic, slow-cooked with vibrant peppers, onions and aromatic spices.',  singlePrice: 60, familyPrice: 120, singleLabel: 'Single Meal (~1L)', familyLabel: 'Family Pack (4-6)', featured: true,  available: true },
  { _id: '2', name: 'Chicken Stew',             category: 'stews', description: 'Rich, hearty, and aromatic tomato-based stew with tender chicken pieces.',                         singlePrice: 70, familyPrice: 130, singleLabel: 'Single Portion',    familyLabel: 'Family Size',       featured: true,  available: true },
  { _id: '3', name: 'African Chicken Stew',     category: 'stews', description: 'Hearty tomato-based stew with tender chicken.',                                                     singlePrice: 64, familyPrice: 108, singleLabel: 'Single',             familyLabel: 'Family',            featured: false, available: true },
  { _id: '4', name: 'Okro Soup',                category: 'soups', description: 'Traditional smooth okra soup with authentic spices.',                                               singlePrice: 60, familyPrice: 100, singleLabel: 'Single',             familyLabel: 'Family',            featured: false, available: true },
  { _id: '5', name: 'Ogbono Soup',              category: 'soups', description: 'Rich, thick African mango seed "draw" soup.',                                                        singlePrice: 60, familyPrice: 100, singleLabel: 'Single',             familyLabel: 'Family',            featured: false, available: true },
  { _id: '6', name: 'Vegetable Soup (Efo Riro)',category: 'soups', description: 'Savory leafy greens in a rich pepper base.',                                                        singlePrice: 60, familyPrice: 100, singleLabel: 'Single',             familyLabel: 'Family',            featured: false, available: true },
]

/* ════════════════════════════════════════
   MENU PAGE
════════════════════════════════════════ */
export default function Menu() {
  const [items,   setItems]   = useState([])
  const [active,  setActive]  = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/api/menu')
      .then(r => setItems(r.data))
      .catch(() => setItems(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar />

      {/* ── Page hero ── */}
      <div
        className="pt-32 pb-14 border-b border-white/5"
        style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(245,197,24,0.08), transparent 60%)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
            Our Menu
          </span>
          <h1 className="font-display font-black mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Stews & Traditional Soups
          </h1>
          <p className="text-white/45 text-base max-w-lg mb-4">
            Every dish crafted with authentic West African spices and slow-cooked to perfection.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/25 text-[#F5C518] text-sm font-semibold px-4 py-2 rounded-full">
            ⏰ Order 24 hours in advance
          </div>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="sticky top-[64px] z-40 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5 py-3">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  active === cat.key
                    ? 'bg-[#F5C518]/15 border border-[#F5C518]/50 text-[#F5C518]'
                    : 'bg-transparent border border-white/10 text-white/45 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {loading ? (
            <div className="text-center py-24 text-white/35">
              <div className="text-5xl mb-4 animate-float">🍽️</div>
              <p>Loading menu...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-white/35">No items in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => <MenuCard key={item._id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Order CTA ── */}
      <div className="bg-[#1B4332] border-t border-[#40916C]/30 py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap justify-between items-center gap-6">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">Ready to order?</h3>
            <p className="text-white/50 text-sm">Contact us via WhatsApp or Email — 24h advance notice required.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5">
              📱 +212 751 780853
            </a>
            <a href="mailto:azikeshinye@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0D0D0D] font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
