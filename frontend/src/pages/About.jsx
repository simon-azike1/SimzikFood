import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Heart, ChefHat, Wheat, Flame, ArrowRight, MessageCircle, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }
const fadeIn  = { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7 } } }

const ABOUT_BG    = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=80'
const COOKING_BG  = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80'
const FOOD2_BG    = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80'

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8 bg-[#F5C518] shrink-0" />
      <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase whitespace-nowrap">{text}</span>
    </div>
  )
}

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-20">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}><SectionLabel text="Our Story" /></motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[0.95] text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
              About <span className="text-[#F5C518] italic"> Azike </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-md mt-6 leading-relaxed">
              Bringing the authentic taste of West Africa to the heart of Morocco.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STORY
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}><SectionLabel text="Who We Are" /></motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-8"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
                Homemade with Heart,<br />Served with Soul
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-5 text-white/50 text-base leading-relaxed">
                <p>Azike Restaurant was born from a deep love for West African cuisine and a desire to share those rich, bold flavors with the people of Morocco. We believe food is more than sustenance — it's culture, community, and connection.</p>
                <p>Every dish we prepare is made with the same care and traditional techniques passed down through generations. From our smoky Jollof Rice to our rich aromatic stews — each meal is a journey to West Africa.</p>
                <p>We operate as a home-delivery service across Rabat and Casablanca, bringing authentic West African home cooking directly to your table.</p>
              </motion.div>
            </motion.div>

            {/* Values grid */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-2 gap-4">
              {[
                { icon: <Wheat size={22} />,   title: 'Authentic',    desc: 'Traditional recipes, unchanged through generations' },
                { icon: <ChefHat size={22} />, title: 'Homemade',     desc: 'Cooked fresh for every single order' },
                { icon: <Flame size={22} />,   title: 'Flavorful',    desc: 'Bold spices, perfectly balanced layers' },
                { icon: <Heart size={22} />,   title: 'Made with Love',desc: 'Every dish crafted with genuine care' },
              ].map(({ icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group bg-[#0F0F0F] rounded-3xl p-6 hover:border-[#F5C518]/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F5C518]/8 flex items-center justify-center text-[#F5C518] mb-4 group-hover:bg-[#F5C518]/15 transition-colors">
                    {icon}
                  </div>
                  <h3 className="font-display font-bold text-[#F5C518] mb-1.5 text-base">{title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-BLEED IMAGE — COOKING
      ══════════════════════════════════════════ */}
      <section className="relative h-[55vh] overflow-hidden">
        <img src={COOKING_BG} alt="cooking" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080808]/90 via-[#080808]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full flex justify-end">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="max-w-sm text-right">
              <motion.div variants={fadeUp} className="flex items-center justify-end gap-3 mb-4">
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">The Food</span>
                <div className="h-px w-8 bg-[#F5C518]" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white text-3xl md:text-4xl mb-4 leading-tight">
                Every Dish<br />Tells a Story
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed">
                Ancient recipes, bold spices, and the warmth of West African hospitality in every bowl.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE SERVE
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-14">
            <motion.div variants={fadeUp}><SectionLabel text="The Menu" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              What We Serve
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Jollof Rice',           desc: 'Spiced rice slow-cooked in rich tomato and pepper sauce with aromatic spices.' },
              { name: 'Chicken Stew',          desc: 'Tender chicken pieces in a hearty, aromatic tomato-based stew.' },
              { name: 'Okro Soup',             desc: 'Traditional smooth okra soup, full of authentic spices.' },
              { name: 'Ogbono Soup',           desc: 'Thick, rich African mango seed "draw" soup — a West African classic.' },
              { name: 'Efo Riro',              desc: 'Savory leafy greens in a vibrant pepper base. Nutritious and delicious.' },
              { name: 'African Chicken Stew',  desc: 'A hearty tomato-based stew with tender chicken, packed with bold flavor.' },
            ].map(({ name, desc }, i) => (
              <motion.div key={name} variants={fadeUp}
                whileHover={{ y: -3 }}
                className="group bg-[#0F0F0F]  rounded-2xl p-6 hover:border-[#F5C518]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-white text-base group-hover:text-[#F5C518] transition-colors">{name}</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]/40" />
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DELIVERY + HOW TO ORDER
      ══════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Delivery */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}><SectionLabel text="Delivery" /></motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white text-3xl md:text-4xl mb-6">
                Where We Deliver
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/45 leading-relaxed mb-8">
                We serve two major cities in Morocco. Delivery fees vary based on your exact location.
              </motion.p>
              <motion.div variants={stagger} className="space-y-3">
                {[
                  { city: 'Rabat', note: 'All districts covered' },
                  { city: 'Casablanca', note: 'All districts covered' },
                ].map(({ city, note }) => (
                  <motion.div key={city} variants={fadeUp}
                    className="flex items-center justify-between bg-[#1B4332]/30 border border-[#40916C]/20 rounded-2xl px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-[#40916C]" />
                      <span className="font-bold text-white">{city}</span>
                    </div>
                    <span className="text-[#40916C] text-xs font-medium">{note}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* How to order */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="bg-[#0F0F0F] border border-[#F5C518]/15 rounded-3xl p-8">
                  <h3 className="font-display font-bold text-[#F5C518] text-2xl mb-8">How to Order</h3>
                  <div className="space-y-6">
                    {[
                      { n: '01', icon: <ChefHat size={16} />,       title: 'Browse the Menu',   desc: 'Check our dishes and prices' },
                      { n: '02', icon: <MessageCircle size={16} />,  title: 'Contact Us',        desc: 'WhatsApp or Email your order' },
                      { n: '03', icon: <Clock size={16} />,          title: 'Order 24h Ahead',   desc: 'Every meal is freshly prepared' },
                      { n: '04', icon: <MapPin size={16} />,         title: 'Receive Delivery',  desc: 'Hot food delivered to your door' },
                    ].map(({ n, icon, title, desc }) => (
                      <div key={title} className="flex gap-4 items-start">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-[#F5C518]/8 border border-[#F5C518]/15 flex items-center justify-center text-[#F5C518]">
                            {icon}
                          </div>
                          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F5C518] text-[#080808] text-[9px] font-black flex items-center justify-center">
                            {n.slice(-1)}
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-white text-sm mb-0.5">{title}</div>
                          <div className="text-white/35 text-xs">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,197,24,0.05) 0%, transparent 60%)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Hungry for Authentic?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-base mb-10">
              Explore our full menu and place your order today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link to="/menu"
                className="group flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-2xl shadow-[#F5C518]/15">
                View Full Menu
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact"
                className="flex items-center gap-2 border border-white/15 text-white/60 hover:border-white/30 hover:text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}