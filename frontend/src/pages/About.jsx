import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar />

      {/* ── Hero ── */}
      <div
        className="pt-36 pb-20"
        style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(45,106,79,0.12), transparent 60%)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
            Our Story
          </span>
          <h1 className="font-display font-black mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            About Azike Restaurant
          </h1>
          <p className="text-white/45 text-lg max-w-xl leading-relaxed">
            Bringing the authentic taste of West Africa to the heart of Morocco.
          </p>
        </div>
      </div>

      {/* ── Story + Values ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text */}
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
                Who We Are
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Homemade with Heart</h2>
              <div className="space-y-4 text-white/55 text-base leading-relaxed">
                <p>Azike Restaurant was born from a deep love for West African cuisine and a desire to share those rich, bold flavors with the people of Morocco. We believe food is more than sustenance — it's culture, community, and connection.</p>
                <p>Every dish we prepare is made with the same care and traditional techniques passed down through generations. From our smoky Jollof Rice to our rich, aromatic Chicken Stew — each meal is a journey to West Africa.</p>
                <p>We operate as a home-delivery service across Rabat and Casablanca, bringing authentic West African home cooking directly to your table.</p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🌍', title: 'Authentic',  desc: 'Traditional West African recipes, unchanged' },
                { icon: '🫙', title: 'Homemade',   desc: 'Cooked fresh for every order' },
                { icon: '🌶️', title: 'Flavorful',  desc: 'Bold spices, perfectly balanced' },
                { icon: '❤️', title: 'With Love',  desc: 'Every dish made with care' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card-hover bg-[#1A1A1A] border border-[#F5C518]/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="font-bold text-[#F5C518] mb-1">{title}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/15 to-transparent" />
      </div>

      {/* ── Dishes ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-4">
              The Food
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl">What We Serve</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Jollof Rice',           emoji: '🍚', desc: 'Spiced rice slow-cooked in a rich tomato and pepper sauce with aromatic spices.' },
              { name: 'Chicken Stew',          emoji: '🍗', desc: 'Tender chicken pieces in a hearty, aromatic tomato-based stew.' },
              { name: 'Okro Soup',             emoji: '🍲', desc: 'Traditional smooth okra soup, full of authentic spices and cultural significance.' },
              { name: 'Ogbono Soup',           emoji: '🥣', desc: 'Thick, rich African mango seed "draw" soup — a beloved West African specialty.' },
              { name: 'Efo Riro',              emoji: '🥬', desc: 'Savory leafy greens cooked in a vibrant pepper base. Nutritious and delicious.' },
              { name: 'African Chicken Stew',  emoji: '🥘', desc: 'A hearty tomato-based stew with tender chicken, packed with bold flavors.' },
            ].map(({ name, emoji, desc }) => (
              <div key={name} className="card-hover bg-[#1A1A1A] border border-[#F5C518]/10 rounded-2xl p-6">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-display font-bold text-[#F5C518] text-lg mb-2">{name}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/15 to-transparent" />
      </div>

      {/* ── Delivery + How to Order ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Delivery areas */}
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
                Delivery
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">Where We Deliver</h2>
              <p className="text-white/50 leading-relaxed mb-8 text-base">
                We currently serve two major cities in Morocco. Delivery fees vary based on your exact location within the city.
              </p>
              <div className="space-y-3">
                {['🏙️ Rabat', '🏙️ Casablanca'].map(city => (
                  <div key={city} className="flex items-center gap-3 bg-[#2D6A4F]/10 border border-[#40916C]/20 rounded-xl px-5 py-4 text-[#40916C] font-semibold">
                    {city}
                  </div>
                ))}
              </div>
            </div>

            {/* How to order */}
            <div className="bg-[#F5C518]/4 border border-[#F5C518]/15 rounded-2xl p-8">
              <h3 className="font-display font-bold text-2xl text-[#F5C518] mb-7">How to Order</h3>
              <div className="space-y-5">
                {[
                  ['1️⃣', 'Browse the Menu', 'Check out our dishes and prices'],
                  ['2️⃣', 'Contact Us',      'WhatsApp or Email us your order'],
                  ['3️⃣', 'Order Ahead',     'Place your order 24h in advance'],
                  ['4️⃣', 'Delivery',        'Fresh meal delivered to your door'],
                ].map(([num, title, desc]) => (
                  <div key={title} className="flex gap-4 items-start">
                    <span className="text-2xl shrink-0 mt-0.5">{num}</span>
                    <div>
                      <div className="font-bold mb-0.5 text-sm">{title}</div>
                      <div className="text-white/40 text-sm">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-[#F5C518]/8"
        style={{ background: 'rgba(245,197,24,0.02)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display font-extrabold mb-4 text-3xl md:text-5xl">Hungry for Authentic?</h2>
          <p className="text-white/45 text-base mb-8">Explore our full menu and place your order today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu"
              className="bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/15">
              View Full Menu
            </Link>
            <Link to="/contact"
              className="border-2 border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0D0D0D] font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
