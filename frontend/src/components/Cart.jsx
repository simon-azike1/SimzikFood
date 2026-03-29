import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, total, getWhatsAppMessage } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Listen for toggle events from Navbar
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggleCart', handleToggle)
    return () => window.removeEventListener('toggleCart', handleToggle)
  }, [])

  const handleWhatsAppOrder = () => {
    const message = getWhatsAppMessage()
    const whatsappUrl = `https://wa.me/212751780853?text=${encodeURIComponent(message)}`
    console.log('WhatsApp URL:', whatsappUrl)
    console.log('Message:', message)
    window.open(whatsappUrl, '_blank')
    clearCart()
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative ml-auto w-full sm:w-[400px] max-w-[85vw] bg-[#0F0F0F] border-l border-white/10 flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#F5C518]" size={20} />
                <h2 className="font-display font-bold text-white text-lg">Your Order</h2>
                {cart.length > 0 && (
                  <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white/60 p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Your cart is empty</p>
                  <p className="text-white/25 text-sm mt-2">Add some delicious dishes from our menu!</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item._id}-${item.size}-${idx}`}
                    layout
                    className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1 text-sm sm:text-base truncate">{item.name}</h3>
                      <p className="text-[#F5C518] text-xs sm:text-sm font-medium">{item.size}</p>
                      <p className="text-white/50 text-xs sm:text-sm">{item.price * item.quantity} MAD</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item._id, item.size)}
                        className="text-white/30 hover:text-red-400 p-1"
                      >
                        <X size={16} />
                      </button>
                      <div className="flex items-center gap-1 sm:gap-2 bg-white/[0.05] rounded-full px-2 sm:px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="text-white/50 hover:text-white p-1"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="text-white/50 hover:text-white p-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-white/10 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm sm:text-base">Total</span>
                  <span className="font-display font-bold text-[#F5C518] text-xl sm:text-2xl">
                    {total} <span className="text-sm text-[#F5C518]/50">MAD</span>
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all text-sm sm:text-base"
                >
                  <MessageCircle size={18} />
                  Send Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}