import ProductCard from './ProductCard'
import { Product } from '../types/product'

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onAddToFavorite?: (product: Product) => void
}

export default function ProductList({
  products,
  onAddToCart,
  onAddToFavorite,
}: ProductListProps) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      ))}
    </div>
  )
}
