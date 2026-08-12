'use client'

import React from 'react'

interface CartItem {
  id: string | number
  name?: string
  nome?: string
  price?: number | string
  preco?: number | string
  quantity?: number
}

interface CartListProps {
  items: CartItem[]
  removeItemFromCart: (id: string | number) => void
}

export default function CartList({ items, removeItemFromCart }: CartListProps) {
  if (!items || items.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-center py-4 text-muted">
            Nenhum produto no carrinho.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {items.map((item) => {
        const name = item.name || item.nome || 'Produto'
        const rawPrice = item.price ?? item.preco ?? 0
        const parsedPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice
        const price = isNaN(parsedPrice) ? 0 : parsedPrice
        const quantity = item.quantity || 1
        const total = price * quantity

        return (
          <tr key={item.id}>
            <td>{name}</td>
            <td>R$ {price.toFixed(2)}</td>
            <td>{quantity}</td>
            <td>R$ {total.toFixed(2)}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItemFromCart(item.id)}
              >
                Remover
              </button>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}