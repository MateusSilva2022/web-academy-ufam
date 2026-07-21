'use client'

import { useState } from 'react'

import Navbar from '../components/Navbar'
import CartSummary from '../components/CartSummary'
import ProductList from '../components/ProductList'

import { products } from '../mocks/products'
import { Product } from '../types/product'

export default function Products() {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const addToCart = (product: Product): void => {
    setTotalItems((value) => value + 1)
    setTotalPrice((value) => value + product.price)
  }

  return (
    <>
      <Navbar />

      <main>
        <div className="container p-5">
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
          />

          <h5 className="mb-3">
            Produtos disponíveis:
          </h5>

          <ProductList
            products={products}
            onAddToCart={addToCart}
          />
        </div>
      </main>
    </>
  )
}