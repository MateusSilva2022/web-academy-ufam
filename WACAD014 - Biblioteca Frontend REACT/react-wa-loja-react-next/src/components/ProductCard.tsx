import Image from 'next/image'
import { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={320}
          className="card-img-top"
        />

        <div className="card-body bg-light">
          <h5>{product.name}</h5>

          <p>R$ {product.price}</p>

          <button
            className="btn btn-dark d-block w-100"
            onClick={() => onAddToCart(product)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  )
}