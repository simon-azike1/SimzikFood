import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Clock, ChefHat, ArrowRight, MessageCircle, Star, Flame, Leaf } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

const HERO_BG = 'https://oaktownspiceshop.com/cdn/shop/articles/Oaktown_-_OYA_Jollof_rice-3.jpg?v=1650932825'
const FOOD_BG = 'https://shopafricausa.com/cdn/shop/articles/ogbono_788x.jpg?v=1566349969'

const FALLBACK = [
  { _id: '1', name: 'Jollof Rice',  category: 'main',  description: 'Smoky, spiced rice slow-cooked in a rich tomato and pepper sauce — the pride of West Africa.', singlePrice: 60, familyPrice: 120, singleLabel: 'Single (~1L)',   familyLabel: 'Family (4–6)', featured: true },
  { _id: '2', name: 'Chicken Stew', category: 'stews', description: 'Tender chicken in a hearty aromatic tomato-based stew, rich with traditional spices.',          singlePrice: 70, familyPrice: 130, singleLabel: 'Single Portion', familyLabel: 'Family Size',  featured: true },
  { _id: '3', name: 'Efo Riro',     category: 'soups', description: 'Vibrant leafy greens sautéed in a bold pepper base — nutritious, soulful, deeply satisfying.',  singlePrice: 60, familyPrice: 100, singleLabel: 'Single',         familyLabel: 'Family',       featured: true },
]

function MenuCard({ item }) {
  const catIcons = {
    main:   <Flame size={14} />,
    stews:  <ChefHat size={14} />,
    soups:  <Leaf size={14} />,
    sides:  <Leaf size={14} />,
    drinks: <Star size={14} />,
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden flex flex-col"
    >
      {item.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <img src={item.imageUrl} alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
          {item.featured && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-[#F5C518] text-[#0D0D0D] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Star size={10} fill="currentColor" /> Chef's Pick
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#F5C518]/40 to-transparent" />
          {item.featured && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#F5C518] text-[#0D0D0D] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Star size={10} fill="currentColor" /> Chef's Pick
            </div>
          )}
        </>
      )}

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[#40916C] mb-4">
          {catIcons[item.category]}
          <span className="text-[10px] font-bold tracking-[3px] uppercase">{item.category}</span>
        </div>
        <h3 className="font-display text-white text-2xl font-bold leading-tight mb-3 group-hover:text-[#F5C518] transition-colors duration-300">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
        )}
        <div className={`grid gap-3 mb-6 ${item.familyPrice ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <div className="rounded-2xl p-4 bg-[#F5C518]/5">
            <div className="text-[9px] text-white/25 font-bold uppercase tracking-widest mb-1">{item.singleLabel || 'Single'}</div>
            <div className="font-display text-[#F5C518] text-2xl font-bold">{item.singlePrice}<span className="text-sm font-normal text-[#F5C518]/50 ml-1">MAD</span></div>
          </div>
          {item.familyPrice && (
            <div className="rounded-2xl p-4 bg-[#40916C]/5">
              <div className="text-[9px] text-white/25 font-bold uppercase tracking-widest mb-1">{item.familyLabel || 'Family'}</div>
              <div className="font-display text-[#40916C] text-2xl font-bold">{item.familyPrice}<span className="text-sm font-normal text-[#40916C]/50 ml-1">MAD</span></div>
            </div>
          )}
        </div>
        <a href="/menu"
          className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366]/8 rounded-2xl text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/15 transition-all group/btn">
          <MessageCircle size={15} />
          Add to Order
          <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const { scrollY } = useScroll()
  const heroY  = useTransform(scrollY, [0, 600], [0, 120])
  const heroOp = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/api/menu?featured=true&limit=3')
      .then(r => setFeatured(r.data.length ? r.data : FALLBACK))
      .catch(() => setFeatured(FALLBACK))
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        <motion.div style={{ opacity: heroOp }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-xs font-bold tracking-[4px] uppercase">West African Cuisine</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
              Taste the <span className="text-[#F5C518] italic">Authentic</span> Flavors
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              Homemade West African dishes slow-cooked with love, delivered to your door across Rabat & Casablanca.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/menu"
                className="group flex items-center gap-3 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-2xl shadow-[#F5C518]/20">
                Explore Menu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 border border-white/20 text-white hover:border-white/40 font-semibold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 backdrop-blur-sm">
                <MessageCircle size={16} /> Order Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 grid grid-cols-3 divide-x divide-white/8">
            {[
              { icon: <MapPin size={16} />,  value: 'Rabat & Casa', label: 'Delivery Areas'   },
              { icon: <Clock size={16} />,   value: '24h Notice',   label: 'Order in Advance' },
              { icon: <ChefHat size={16} />, value: '11+ Dishes',   label: 'On The Menu'      },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-6 first:pl-0 last:pr-0">
                <div className="text-[#F5C518] shrink-0">{icon}</div>
                <div>
                  <div className="font-bold text-sm text-white">{value}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ORDER NOTICE BANNER */}
      <div className="bg-[#1B4332] border-y border-[#40916C]/20 py-4">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-[#40916C] shrink-0" />
            <span className="text-white/70 text-sm">All meals are freshly prepared — please order at least <strong className="text-white">24 hours in advance</strong></span>
          </div>
          <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
            className="text-[#F5C518] text-sm font-bold hover:text-[#FFD84D] transition-colors flex items-center gap-1.5">
            Order Today <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* FEATURED DISHES */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            variants={stagger} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#F5C518]" />
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Signature Dishes</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Made Fresh, Every Order
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link to="/menu"
                className="group flex items-center gap-2 text-[#F5C518] font-semibold text-sm border border-[#F5C518]/30 px-5 py-2.5 rounded-full hover:bg-[#F5C518]/8 transition-all">
                View Full Menu <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((item) => <MenuCard key={item._id} item={item} />)}
          </motion.div>
        </div>
      </section>

      {/* FULL-BLEED IMAGE BREAK */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={FOOD_BG} alt="West African food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-lg">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F5C518]" />
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Our Promise</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
                Cooked Like<br /><em className="text-[#F5C518]">Home</em>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/55 text-base leading-relaxed">
                Every dish uses the same recipes, spices and techniques passed down through generations of West African cooking.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Why AfriDish</span>
              <div className="h-px w-8 bg-[#F5C518]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Made with Passion, Served with Pride
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <ChefHat size={22} />, title: 'Homemade Quality', desc: 'Authentic recipes, traditional techniques, fresh ingredients.' },
              { icon: <Flame size={22} />,   title: 'Bold Flavors',     desc: 'Rich spices, slow-cooked perfection in every bite.'           },
              { icon: <MapPin size={22} />,  title: 'Home Delivery',    desc: 'We deliver across Rabat and Casablanca.'                       },
              { icon: <Leaf size={22} />,    title: 'Generous Portions',desc: 'Single ~1L containers. Family packs feed 4–6.'                 },
            ].map(({ icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} whileHover={{ y: -4 }}
                className="group bg-[#0F0F0F] rounded-3xl p-7 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#F5C518]/8 flex items-center justify-center text-[#F5C518] mb-5 group-hover:bg-[#F5C518]/15 transition-colors">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-[#F5C518] text-lg mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">How It Works</span>
              <div className="h-px w-8 bg-[#F5C518]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-white mb-16">
              Order in 3 Simple Steps
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { n: '01', icon: <ChefHat size={24} />,      title: 'Browse Menu', desc: 'Pick your favourite dishes — single or family size.'  },
                { n: '02', icon: <MessageCircle size={24} />, title: 'Send Order',  desc: 'WhatsApp us with your order and address, 24h ahead.'  },
                { n: '03', icon: <MapPin size={24} />,        title: 'We Deliver',  desc: 'Your freshly cooked meal arrives hot and ready.'       },
              ].map(({ n, icon, title, desc }) => (
                <motion.div key={n} variants={fadeUp} className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#0F0F0F] flex items-center justify-center text-[#F5C518] mb-5">
                    {icon}
                    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#F5C518] text-[#080808] text-[11px] font-black flex items-center justify-center">{n}</div>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-white/5"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,197,24,0.06) 0%, transparent 60%)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Ready to Order?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-base mb-10 leading-relaxed">
              Message us on WhatsApp — order at least 24 hours ahead for fresh preparation.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="group flex items-center gap-3 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-2xl shadow-[#F5C518]/15">
                <MessageCircle size={16} />+212 751 780853
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="mailto:azikeshinye@gmail.com"
                className="flex items-center gap-3 border border-white/15 text-white/60 hover:border-white/30 hover:text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5">
                Send Email
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}