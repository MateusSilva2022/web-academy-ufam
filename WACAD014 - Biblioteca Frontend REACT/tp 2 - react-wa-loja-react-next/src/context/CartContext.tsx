'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '../types/product'
import { products as initialProducts } from '../mocks/products'

interface CartContextType {
  products: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addToCart = (product: Product) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }

  return context
}