import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Truck, Package, UtensilsCrossed, CalendarDays, Clock, MessageCircle,
  ArrowRight, ChefHat, MapPin, Flame, CheckCircle, Users
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SERVICES_BG = 'https://img.freepik.com/premium-photo/african-dish-jollof-rice-with-chicken-fried-plantain-plate_817921-44550.jpg'
const TABLE_BG    = 'https://substackcdn.com/image/fetch/$s_!0Now!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F65c45040-77b3-4953-b17d-14cffa995a87_3670x3670.heic'

const fadeUp  = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.09 } } }

const SERVICES = [
  {
    icon: <Truck size={22} />,
    title: 'Home Delivery',
    desc: 'Freshly cooked West African meals delivered straight to your door across Rabat and Casablanca. Order 24h ahead and we handle the rest.',
    highlight: 'Rabat & Casablanca',
  },
  {
    icon: <Users size={22} />,
    title: 'Family Packs',
    desc: 'Feeding the whole family? Our large-format containers come with 4–6 generous portions — ideal for gatherings, celebrations, or meal prepping.',
    highlight: 'Feeds 4–6 people',
  },
  {
    icon: <UtensilsCrossed size={22} />,
    title: 'Single Meals',
    desc: 'Individually portioned ~1L containers for a satisfying solo meal. Authentic flavors, generous portions, no effort required.',
    highlight: '~1L per container',
  },
  {
    icon: <CalendarDays size={22} />,
    title: 'Event Catering',
    desc: 'Planning a party, gathering or office event? Get in touch to discuss bulk orders and custom catering arrangements for your occasion.',
    highlight: 'Contact us to arrange',
  },
  {
    icon: <Clock size={22} />,
    title: 'Pre-Order Service',
    desc: 'We require 24 hours notice so every meal is freshly prepared just for you — never reheated, always made to order.',
    highlight: '24h advance required',
  },
  {
    icon: <MessageCircle size={22} />,
    title: 'WhatsApp Ordering',
    desc: 'The easiest way to place your order. Send us a message with your order, delivery address, and preferred time.',
    highlight: '+212 751 780853',
  },
]

const PRICING = [
  { dish: 'Jollof Rice',              single: '60', family: '120' },
  { dish: 'Chicken Stew',             single: '70', family: '130' },
  { dish: 'African Chicken Stew',     single: '64', family: '108' },
  { dish: 'Okro Soup',                single: '60', family: '100' },
  { dish: 'Ogbono Soup',              single: '60', family: '100' },
  { dish: 'Vegetable Soup (Efo Riro)',single: '60', family: '100' },
]

function SectionLabel({ text, center }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
      {center && <div className="h-px w-8 bg-[#F5C518]" />}
      {!center && <div className="h-px w-8 bg-[#F5C518]" />}
      <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase whitespace-nowrap">{text}</span>
      {center && <div className="h-px w-8 bg-[#F5C518]" />}
    </div>
  )
}

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_BG} alt="Our Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-16">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">What We Offer</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[0.95] text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Our <span className="text-[#F5C518] italic">Services</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-base max-w-md mt-6 leading-relaxed">
              From single meal deliveries to family packs and event catering — we've got you covered.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-16">
            <motion.div variants={fadeUp}><SectionLabel text="Services" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Everything You Need
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon, title, desc, highlight }) => (
              <motion.div key={title} variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group bg-[#0F0F0F] rounded-3xl p-7 hover:border-[#F5C518]/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5C518]/8 flex items-center justify-center text-[#F5C518] mb-5 group-hover:bg-[#F5C518]/15 transition-colors">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-[#F5C518] transition-colors">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{desc}</p>
                <div className="inline-flex items-center gap-2 bg-[#40916C]/8 border border-[#189435]/18 text-[#40916C] text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} />
                  {highlight}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL BLEED — TABLE SCENE
      ══════════════════════════════════════════ */}
      <section className="relative h-[50vh] overflow-hidden">
        <img src={TABLE_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080808]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full flex justify-end">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="max-w-sm text-right">
              <motion.div variants={fadeUp} className="flex items-center justify-end gap-3 mb-4">
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Pricing</span>
                <div className="h-px w-8 bg-[#F5C518]" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
                Simple, <em className="text-[#F5C518]">Transparent</em>Pricing
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING TABLE
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>

            {/* Table */}
            <motion.div variants={fadeUp}
              className="bg-[#0F0F0F] border border-white/7 rounded-3xl overflow-hidden">

              {/* Header */}
              <div className="grid grid-cols-3 px-6 md:px-8 py-5 bg-[#F5C518]/5 border-b border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-[3px] text-white/50">Dish</div>
                <div className="text-[10px] font-bold uppercase tracking-[3px] text-[#F5C518] text-center">Single</div>
                <div className="text-[10px] font-bold uppercase tracking-[3px] text-[#40916C] text-center">Family</div>
              </div>

              {/* Rows */}
              {PRICING.map(({ dish, single, family }, i) => (
                <motion.div key={dish} variants={fadeUp}
                  className={`grid grid-cols-3 px-6 md:px-8 py-4 items-center hover:bg-white/[0.02] transition-colors ${
                    i < PRICING.length - 1 ? 'border-b border-white/[0.04]' : ''
                  }`}
                >
                  <div className="font-medium text-white/80 text-sm">{dish}</div>
                  <div className="text-center">
                    <span className="font-display font-bold text-[#F5C518] text-lg">{single}</span>
                    <span className="text-[#F5C518]/40 text-xs ml-1">MAD</span>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-bold text-[#40916C] text-lg">{family}</span>
                    <span className="text-[#40916C]/40 text-xs ml-1">MAD</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/25 text-xs text-center mt-4">
              Delivery fee calculated separately based on your location within Rabat or Casablanca.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionLabel text="Process" center /></motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white text-3xl md:text-4xl mb-16">
              3 Easy Steps
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { n: '01', icon: <UtensilsCrossed size={22} />, title: 'Browse & Choose', desc: 'Pick your favourite dishes — single or family size at simple, transparent prices.' },
                { n: '02', icon: <MessageCircle size={22} />,  title: 'Place Your Order', desc: 'WhatsApp or email us with your order and address at least 24h in advance.' },
                { n: '03', icon: <Truck size={22} />,          title: 'Receive & Enjoy',  desc: 'Your freshly cooked meal arrives hot and ready — pure West African flavors.' },
              ].map(({ n, icon, title, desc }) => (
                <motion.div key={n} variants={fadeUp} className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#0F0F0F] border border-white/8 flex items-center justify-center text-[#F5C518] mb-5">
                    {icon}
                    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#F5C518] text-[#080808] text-[10px] font-black flex items-center justify-center">
                      {n}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,197,24,0.05), transparent 60%)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-base mb-10 leading-relaxed">
              Order on WhatsApp or browse our full menu first.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <a href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="group flex items-center gap-3 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-xl shadow-[#F5C518]/15">
                <MessageCircle size={16} />
                Order on WhatsApp
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/menu"
                className="group flex items-center gap-3 border border-white/15 text-white/60 hover:border-white/30 hover:text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5">
                View Menu
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}