import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle, Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CONTACT_BG = 'https://cdn.broadsheet.com.au/cache/e4/da/e4da3813aea5308ca6e783a008f5d8de.webp'

const fadeUp  = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

function InputField({ label, required, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-2">
        {label}{required && <span className="text-[#F5C518] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full bg-white/[0.04] text-white placeholder-white/15 px-4 py-3.5 rounded-xl outline-none focus:bg-white/[0.06] transition-all text-sm'

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.message) { toast.error('Please fill in your name and message'); return }
    setSending(true)
    try {
      await axios.post('/api/contact', form)
      toast.success("Message sent! We'll be in touch soon.")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Failed to send. Please contact us directly via WhatsApp.')
    } finally { setSending(false) }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[65vh] min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={CONTACT_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-[#080808]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-16">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#F5C518]" />
              <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Get In Touch</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[0.95] text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Contact <span className="text-[#F5C518] italic">Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-base max-w-md mt-6 leading-relaxed">
              Ready to order or have questions? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">

            {/* Left: Contact info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F5C518]" />
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Let's Talk</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-8"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
                Get in Touch
              </motion.h2>

              <motion.div variants={stagger} className="space-y-3 mb-8">
                {[
                  { icon: <Phone size={18} />, color: '#25D366', title: 'WhatsApp',     subtitle: 'Fastest way to order',        value: '+212 751 780853',        link: 'https://wa.me/212751780853' },
                  { icon: <Mail size={18} />,  color: '#F5C518', title: 'Email',        subtitle: 'Enquiries & pre-orders',      value: 'afridishdelivery@gmail.com', link: 'mailto:afridishdelivery@gmail.com' },
                  { icon: <MapPin size={18} />,color: '#40916C', title: 'Service Areas',subtitle: 'Delivery fee varies',         value: 'Rabat & Casablanca',     link: null },
                  { icon: <Clock size={18} />, color: '#a78bfa', title: 'Order Notice', subtitle: 'Please plan ahead',          value: '24 Hours in Advance',    link: null },
                ].map(({ icon, color, title, subtitle, value, link }) => (
                  <motion.div key={title} variants={fadeUp}
                    className="flex gap-4 items-center bg-[#0F0F0F] rounded-2xl p-5 transition-all">
                    <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}10`, color }}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-0.5">{title}</div>
                      {link ? (
                        <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          className="font-bold text-sm hover:opacity-80 transition-opacity block truncate"
                          style={{ color }}>{value}</a>
                      ) : (
                        <div className="font-bold text-sm truncate" style={{ color }}>{value}</div>
                      )}
                      <div className="text-[11px] text-white/25 mt-0.5">{subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a variants={fadeUp}
                href="https://wa.me/212751780853" target="_blank" rel="noreferrer"
                className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl shadow-[#25D366]/15">
                <MessageCircle size={18} />
                Chat Now
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F5C518]" />
                <span className="text-[#F5C518] text-[10px] font-bold tracking-[4px] uppercase">Message Us</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white mb-8"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
                Send a Message
              </motion.h2>

              <motion.div variants={fadeUp} className="bg-[#0F0F0F] rounded-3xl p-7 md:p-8 space-y-5">
                <InputField label="Your Name" required>
                  <input type="text" placeholder="Enter your name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputCls} />
                </InputField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Email">
                    <input type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className={inputCls} />
                  </InputField>
                  <InputField label="Phone / WhatsApp">
                    <input type="tel" placeholder="+212 ..."
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={inputCls} />
                  </InputField>
                </div>
                <InputField label="Message" required>
                  <textarea rows={5} placeholder="What would you like to order?"
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`} />
                </InputField>
                <button onClick={handleSubmit} disabled={sending}
                  className={`w-full flex items-center justify-center gap-3 bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-[#F5C518]/10 ${sending ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}>
                  {sending ? 'Sending...' : <><Send size={15} />Send Message</>}
                </button>
                <p className="text-center text-white/20 text-xs pt-1">
                  For the fastest response, use WhatsApp above.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
            <div className="bg-[#111316] px-8 py-6">
              <p className="text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.35em] mb-2">Find Us</p>
              <h3 className="text-3xl font-bold text-white">Google Map</h3>
              <p className="text-white/50 mt-2">View our service area and reach out via WhatsApp or email for the fastest response.</p>
            </div>
            <iframe
              title="AfriDish location"
              src="https://maps.google.com/maps?q=Rabat%20Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}