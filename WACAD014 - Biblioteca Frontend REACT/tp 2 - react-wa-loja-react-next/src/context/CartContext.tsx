'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

interface CartContextData {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string | number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialização lazy: lê o localStorage antes do primeiro render no cliente
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('@WA-Loja:cart')
      if (storedCart) {
        try {
          return JSON.parse(storedCart)
        } catch (e) {
          console.error('Erro ao carregar carrinho do localStorage', e)
        }
      }
    }
    return []
  })

 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('@WA-Loja:cart', JSON.stringify(items))
    }
  }, [items])

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => String(item.id) === String(product.id)
      )
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        }
        return updated
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(id)))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}