import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Truck, MessageCircle } from 'lucide-react'

export default function PromoBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after 2.5 seconds, only once per session
    const dismissed = sessionStorage.getItem('promoDismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('promoDismissed', 'true')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.9,   y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none"
          >
            <div className="relative w-full max-w-sm pointer-events-auto overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl shadow-black/60">

              {/* Gold top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#F5C518] via-[#FFD84D] to-[#F5C518]" />

              {/* Close button */}
              <button onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                <X size={15} />
              </button>

              <div className="px-8 pt-8 pb-8 text-center">

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🍲</span>
                </div>

                {/* Label */}
                <div className="inline-flex items-center gap-2 bg-[#F5C518]/8 border border-[#F5C518]/20 text-[#F5C518] text-[10px] font-bold uppercase tracking-[3px] px-4 py-1.5 rounded-full mb-5">
                  🏠 Fresh & Homemade
                </div>

                {/* Headline */}
                <h2 className="font-display font-bold text-white text-3xl leading-tight mb-3">
                  Freshly Made<br />
                  <span className="text-[#F5C518] italic">Nigerian Dishes!</span>
                </h2>

                {/* Body */}
                <p className="text-white/45 text-sm leading-relaxed mb-2">
                  Authentic <span className="text-white font-bold">Nigerian home-cooked meals</span> prepared with love and traditional recipes.
                </p>
                <p className="text-white/25 text-xs mb-8">
                  Delivered to your door • Made with love
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-white/15 text-[10px] uppercase tracking-widest">order now</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* CTA */}
                <a
                  href="/menu"
                  className="flex items-center justify-center gap-2.5 w-full bg-[#F5C518] hover:bg-[#FFD84D] text-[#080808] font-bold py-4 rounded-2xl text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F5C518]/15 mb-3"
                >
                  <MessageCircle size={16} />
                  Browse Menu
                </a>

                <button onClick={dismiss}
                  className="text-white/20 text-xs hover:text-white/40 transition-colors">
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}