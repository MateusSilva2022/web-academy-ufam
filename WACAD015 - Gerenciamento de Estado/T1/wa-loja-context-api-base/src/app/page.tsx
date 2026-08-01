'use client'

import ProductList from './components/ProductList/ProductList'
import { mockProducts } from './mocks/products'

export default function HomePage() {
  return (
    <main>
      <div className="container p-5">
        <ProductList products={mockProducts} />
      </div>
    </main>
  )
}