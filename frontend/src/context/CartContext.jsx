import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item, size, price) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id && i.size === size)
      if (existing) {
        return prev.map(i => 
          i._id === item._id && i.size === size 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      }
      return [...prev, { ...item, size, price, quantity: 1 }]
    })
  }

  const removeItem = (id, size) => {
    setCart(prev => prev.filter(i => !(i._id === id && i.size === size)))
  }

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }
    setCart(prev => prev.map(i => 
      i._id === id && i.size === size 
        ? { ...i, quantity } 
        : i
    ))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const getWhatsAppMessage = () => {
    if (cart.length === 0) return ''
    
    let message = "Hello! I would like to order:\n\n"
    cart.forEach(item => {
      message += `• ${item.name} (${item.size}) x${item.quantity} = ${item.price * item.quantity} MAD\n`
    })
    message += `\nTotal: ${total} MAD\n\nPlease confirm availability. Thank you!`
    return message
  }

  return (
    <CartContext.Provider value={{ 
      cart, addItem, removeItem, updateQuantity, clearCart, total, getWhatsAppMessage 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)