'use client'

import { createContext, useContext, useState } from 'react'
import { calculateDiscountedPrice } from '../helpers'
import { Product } from '../types/product'

interface FavoritesContextType {
  favorites: Product[]
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>

  addFavorite: (product: Product) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  totalFavoriteValue: number
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},

  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  totalFavoriteValue: 0
})

interface FavoritesProviderProps {
  children: React.ReactNode
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([])

  const addFavorite = (product: Product) => {
    setFavorites((currentFavorites) => [
      ...currentFavorites,
      product,
    ])
  }

  const removeFavorite = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id)
    )
  }

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  const totalFavoriteValue = favorites.reduce((acc, product) => {
    return (
      acc +
      calculateDiscountedPrice(
        Number(product.preco),
        product.desconto
      )
    )
  }, 0)

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        totalFavoriteValue,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavoritesContext() {
  return useContext(FavoritesContext)
}