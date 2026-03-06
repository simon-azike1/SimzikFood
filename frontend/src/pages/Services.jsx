import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SERVICES = [
  {
    icon: '🚚',
    title: 'Home Delivery',
    desc: 'We deliver freshly cooked West African meals straight to your door in Rabat and Casablanca. Just order 24 hours ahead and we handle the rest.',
    highlight: 'Rabat & Casablanca',
  },
  {
    icon: '📦',
    title: 'Family Packs',
    desc: 'Feeding the whole family? Our family-size blue tubs come with 4-6 generous portions — perfect for gatherings, celebrations or meal prepping.',
    highlight: 'Feeds 4–6 people',
  },
  {
    icon: '🍱',
    title: 'Single Meals',
    desc: 'Individually portioned ~1L containers for a satisfying solo meal. Great for lunch or dinner when you want authentic flavors without the effort.',
    highlight: '~1L per container',
  },
  {
    icon: '🎉',
    title: 'Event Catering',
    desc: 'Planning a party, get-together or office event? Contact us to discuss bulk orders and custom catering arrangements for your occasion.',
    highlight: 'Contact us to arrange',
  },
  {
    icon: '📅',
    title: 'Pre-Order Service',
    desc: 'We require orders at least 24 hours in advance so every meal is prepared fresh just for you — never reheated, always made to order.',
    highlight: '24h advance notice',
  },
  {
    icon: '📱',
    title: 'WhatsApp Ordering',
    desc: 'The easiest way to place your order is through WhatsApp. Send us a message with your order, delivery address, and preferred time.',
    highlight: '+212 751 780853',
  },
]

const PRICING = [
  { dish: 'Jollof Rice',             single: '60 MAD',  family: '120 MAD' },
  { dish: 'Chicken Stew',            single: '70 MAD',  family: '130 MAD' },
  { dish: 'African Chicken Stew',    single: '64 MAD',  family: '108 MAD' },
  { dish: 'Okro Soup',               single: '60 MAD',  family: '100 MAD' },
  { dish: 'Ogbono Soup',             single: '60 MAD',  family: '100 MAD' },
  { dish: 'Vegetable Soup (Efo Riro)',single: '60 MAD', family: '100 MAD' },
]

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />

      {/* ── Hero ── */}
      <div
        className="pt-36 pb-20 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,197,24,0.07), transparent 60%)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
            What We Offer
          </span>
          <h1 className="font-display font-black mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Our Services
          </h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            From single meal deliveries to family packs and event catering — we've got you covered.
          </p>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc, highlight }) => (
              <div key={title} className="card-hover bg-[#1A1A1A] border border-[#F5C518]/10 rounded-2xl p-7">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-[#F5C518] text-xl mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="inline-block bg-[#2D6A4F]/15 border border-[#40916C]/25 text-[#40916C] text-xs font-semibold px-3 py-1.5 rounded-full">
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/20 to-transparent" />
      </div>

      {/* ── Pricing Table ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
              Pricing
            </span>
            <h2 className="font-display font-bold text-4xl mb-3">Simple, Transparent Pricing</h2>
            <p className="text-white/45 text-lg">All prices in Moroccan Dirhams (MAD). Delivery fee varies by distance.</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#F5C518]/10 rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 px-6 py-4 bg-[#F5C518]/8 border-b border-[#F5C518]/15">
              <div className="font-bold text-[#F5C518] text-sm uppercase tracking-wide">Dish</div>
              <div className="font-bold text-[#F5C518] text-sm uppercase tracking-wide text-center">Single Portion</div>
              <div className="font-bold text-[#40916C] text-sm uppercase tracking-wide text-center">Family Size</div>
            </div>
            {/* Rows */}
            {PRICING.map(({ dish, single, family }, i) => (
              <div
                key={dish}
                className={`grid grid-cols-3 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors ${i < PRICING.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="font-medium text-white text-sm">{dish}</div>
                <div className="text-center font-display font-bold text-[#F5C518]">{single}</div>
                <div className="text-center font-display font-bold text-[#40916C]">{family}</div>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs text-center mt-4">
            * Delivery fee is calculated separately based on your location within Rabat or Casablanca.
          </p>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/20 to-transparent" />
      </div>

      {/* ── How it works ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
            How It Works
          </span>
          <h2 className="font-display font-bold text-4xl mb-14">3 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📋', title: 'Browse & Choose', desc: 'Check our menu and pick your favourite dishes. Choose between single or family size.' },
              { step: '02', icon: '📱', title: 'Send Your Order', desc: 'WhatsApp or email us your order with your delivery address, at least 24h ahead.' },
              { step: '03', icon: '🚚', title: 'Receive & Enjoy', desc: 'Your freshly cooked meal is delivered hot and ready to eat. Enjoy authentic flavors!' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/25 flex items-center justify-center text-2xl mb-4 relative">
                  {icon}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F5C518] text-[#0D0D0D] text-[10px] font-black flex items-center justify-center">
                    {step}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-[#F5C518] mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 border-t border-[#F5C518]/8"
        style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.04), rgba(45,106,79,0.06))' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/50 text-lg mb-8">
            Order now via WhatsApp or explore our full menu first.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/212751780853"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-9 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
            >
              📱 Order on WhatsApp
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 border-2 border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0D0D0D] font-bold px-9 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            >
              🍽️ View Menu
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
