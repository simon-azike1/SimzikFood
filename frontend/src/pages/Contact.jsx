import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.message) { toast.error('Please fill in your name and message'); return }
    setSending(true)
    try {
      await axios.post('/api/contact', form)
      toast.success("Message sent! We'll get back to you soon.")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Failed to send. Please contact us directly via WhatsApp.')
    } finally { setSending(false) }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 focus:border-[#F5C518] text-white placeholder-white/25 px-4 py-3 rounded-xl outline-none transition-colors text-sm'

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />

      {/* ── Hero ── */}
      <div
        className="pt-36 pb-16 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,197,24,0.06), transparent 60%)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-[#F5C518] border border-[#F5C518]/40 px-4 py-1.5 rounded-full mb-5">
            Get In Touch
          </span>
          <h1 className="font-display font-black mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Contact Us
          </h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Ready to order or have questions? Reach out — we'd love to hear from you.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* Contact info */}
            <div>
              <h2 className="font-display font-bold text-3xl mb-8">Let's Talk</h2>
              <div className="space-y-3 mb-8">
                {[
                  { icon: '📱', title: 'WhatsApp (Preferred)', content: '+212 751 780853',        link: 'https://wa.me/212751780853',     color: '#25D366', note: 'Fastest way to order' },
                  { icon: '✉️', title: 'Email',                content: 'azikeshinye@gmail.com', link: 'mailto:azikeshinye@gmail.com',    color: '#F5C518', note: 'For enquiries and pre-orders' },
                  { icon: '📍', title: 'Service Areas',        content: 'Rabat & Casablanca',    link: null,                             color: '#40916C', note: 'Delivery fee varies by distance' },
                  { icon: '⏰', title: 'Order Notice',         content: '24 Hours in Advance',   link: null,                             color: '#F5C518', note: 'Please plan your orders ahead' },
                ].map(({ icon, title, content, link, color, note }) => (
                  <div
                    key={title}
                    className="flex gap-4 items-start p-5 bg-white/[0.03] border border-white/7 rounded-2xl hover:border-[#F5C518]/20 transition-colors"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}18` }}>
                      {icon}
                    </div>
                    <div>
                      <div className="text-[11px] text-white/35 font-semibold uppercase tracking-wide mb-1">{title}</div>
                      {link ? (
                        <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          className="font-bold text-base hover:opacity-75 transition-opacity" style={{ color }}>
                          {content}
                        </a>
                      ) : (
                        <div className="font-bold text-base" style={{ color }}>{content}</div>
                      )}
                      <div className="text-xs text-white/30 mt-0.5">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/212751780853"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg"
              >
                💬 Chat on WhatsApp Now
              </a>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-display font-bold text-3xl mb-8">Send a Message</h2>
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">

                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">Your Name *</label>
                  <input type="text" placeholder="Enter your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>

                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>

                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">Phone / WhatsApp</label>
                  <input type="tel" placeholder="+212 ..." value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-2">Message *</label>
                  <textarea rows={5} placeholder="What would you like to order?" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-y`} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className={`w-full bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/15 ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {sending ? '⏳ Sending...' : '✉️ Send Message'}
                </button>

                <p className="text-center text-white/25 text-xs mt-4">
                  For the fastest response, use WhatsApp above.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
