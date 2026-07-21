'use client'

import { useState } from 'react'

import Navbar from '../../components/Navbar'
import CartSummary from '../../components/CartSummary'
import CartList from '../../components/CartList'

import { cartItems as initialCartItems } from '../../mocks/cartItems'
import { CartItem } from '../../types/cart'

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems)

  const removeItemFromCart = (id: number): void => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    )
  }

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <>
      <Navbar />

      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Valor Unitário</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                      <th>Opções</th>
                    </tr>
                  </thead>

                  <CartList
                    items={items}
                    removeItemFromCart={removeItemFromCart}
                  />
                </table>
              </div>
            </div>
          </div>

          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </div>
      </main>
    </>
  )
}