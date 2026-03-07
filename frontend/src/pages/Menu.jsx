import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, ChefHat, Leaf, Droplets, Star, MessageCircle, ArrowRight, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MENU_BG = 'https://sisijemimah.com/wp-content/uploads/2015/06/20190728_121338.jpg'

const fadeUp  = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

const CATEGORIES = [
  { key: 'all',    label: 'All Dishes', icon: <ChefHat size={14} /> },
  { key: 'main',   label: 'Main',       icon: <Flame size={14} /> },
  { key: 'stews',  label: 'Stews',      icon: <Droplets size={14} /> },
  { key: 'soups',  label: 'Soups',      icon: <Leaf size={14} /> },
  { key: 'sides',  label: 'Sides',      icon: <Leaf size={14} /> },
  { key: 'drinks', label: 'Drinks',     icon: <Droplets size={14} /> },
]

const catIcons = {
  main:   <Flame size={15} />,
  stews:  <Droplets size={15} />,
  soups:  <Leaf size={15} />,
  sides:  <Leaf size={15} />,
  drinks: <Droplets size={15} />,
}

const FALLBACK = [
  { _id: '1', name: 'Jollof Rice',               category: 'main',  description: 'A flavorful West African classic, slow-cooked with vibrant peppers, onions and aromatic spices.',  singlePrice: 60, familyPrice: 120, singleLabel: 'Single Meal (~1L)', familyLabel: 'Family Pack (4-6)', featured: true  },
  { _id: '2', name: 'Chicken Stew',              category: 'stews', description: 'Rich, hearty, aromatic tomato-based stew with tender chicken pieces.',                              singlePrice: 70, familyPrice: 130, singleLabel: 'Single Portion',    familyLabel: 'Family Size',       featured: true  },
  { _id: '3', name: 'Okro Soup',                 category: 'soups', description: 'Traditional smooth okra soup with authentic West African spices.',                                  singlePrice: 65, familyPrice: 110, singleLabel: 'Single',             familyLabel: 'Family',            featured: false },
  { _id: '4', name: 'Ogbono Soup',               category: 'soups', description: 'Rich, thick African mango seed draw soup — a beloved West African specialty.',                      singlePrice: 70, familyPrice: 120, singleLabel: 'Single',             familyLabel: 'Family',            featured: false },
  { _id: '5', name: 'Vegetable Soup (Efo Riro)', category: 'soups', description: 'Savory leafy greens cooked in a vibrant pepper base. Nutritious and deeply flavorful.',            singlePrice: 70, familyPrice: 120, singleLabel: 'Single',             familyLabel: 'Family',            featured: false },
]

function MenuCard({ item }) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group bg-[#0F0F0F] rounded-3xl overflow-hidden flex flex-col transition-all duration-300"
    >
      {item.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <img src={item.imageUrl} alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
          {item.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[#F5C518] bg-[#0D0D0D]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Star size={10} fill="currentColor" /> Chef's Pick
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/30 to-transparent" />
          {item.featured && (
            <div className="flex items-center gap-1.5 px-6 pt-5 pb-0">
              <div className="flex items-center gap-1.5 text-[#F5C518] bg-[#F5C518]/8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Star size={10} fill="currentColor" /> Chef's Pick
              </div>
            </div>
          )}
        </>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[#40916C] mb-3">
          {catIcons[item.category]}
          <span className="text-[10px] font-bold tracking-[3px] uppercase">{item.category}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#F5C518] transition-colors duration-300">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
        )}

        <div className={`grid gap-3 mb-5 ${item.familyPrice ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <div className="bg-[#F5C518]/5 rounded-2xl p-4">
            <div className="text-[9px] text-white/25 font-bold uppercase tracking-[3px] mb-1.5">
              {item.singleLabel || 'Single'}
            </div>
            <div className="font-display text-[#F5C518] text-2xl font-bold leading-none">
              {item.singlePrice}
              <span className="text-xs text-[#F5C518]/40 ml-1 font-normal">MAD</span>
            </div>
          </div>
          {item.familyPrice && (
            <div className="bg-[#40916C]/5 rounded-2xl p-4">
              <div className="text-[9px] text-white/25 font-bold uppercase tracking-[3px] mb-1.5">
                {item.familyLabel || 'Family'}
              </div>
              <div className="font-display text-[#40916C] text-2xl font-bold leading-none">
                {item.familyPrice}
                <span className="text-xs text-[#40916C]/40 ml-1 font-normal">MAD</span>
              </div>
            </div>
          )}
        </div>

        <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366]/6 rounded-2xl text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/12 transition-all group/btn">
          <MessageCircle size={14} />
          Order via WhatsApp
          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  )
}

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
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={MENU_BG} alt="Our Menu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-16">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Our Menu</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[0.95] text-white mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Stews & <span className="text-[#F5C518] italic">Traditional</span><br />Soups
            </motion.h1>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#F5C518]/8 text-[#F5C518] text-xs font-semibold px-4 py-2 rounded-full">
              <Star size={12} />
              Order 24 hours in advance
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-[64px] z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4">
          <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                  active === cat.key ? 'bg-[#F5C518] text-[#080808]' : 'bg-white/[0.04] text-white/40 hover:text-white/65'
                }`}>
                <span className={active === cat.key ? 'text-[#080808]' : 'text-white/30'}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-white/20 text-sm">Loading menu...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <ChefHat size={32} className="text-white/15" />
              <p className="text-white/25 text-sm">No items in this category yet.</p>
            </div>
          ) : (
            <motion.div key={active} initial="hidden" animate="show" variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(item => <MenuCard key={item._id} item={item} />)}
            </motion.div>
          )}
        </div>
      </section>

      <div className="bg-[#1B4332] border-t border-[#40916C]/25 py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-1">Ready to order?</h3>
              <p className="text-white/50 text-sm">WhatsApp or Email — please give us 24h advance notice.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5">
                <MessageCircle size={15} />+212 751 780853
              </a>
              <a href="mailto:azikeshinye@gmail.com"
                className="flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/35 font-semibold px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}