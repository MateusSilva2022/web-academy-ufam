'use client'

import { createContext, useState } from 'react'
import { Product } from '../types/product'

interface FavoritesContextType {
  favorites: Product[]
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {}
})

interface FavoritesProviderProps {
  children: React.ReactNode
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([])

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}