'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onAddToFavorite?: (product: Product) => void
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToFavorite,
}: ProductCardProps) {
  const router = useRouter()

  const handleDetails = () => {
    router.push(`/product/${product.id}`)
  }

  const imageSrc =
    product.fotos?.[0]?.src || product.image || '/placeholder.png'
  const productName = product.nome || product.name || 'Produto sem nome'
  const rawPrice = product.preco ?? product.price ?? 0
  const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice
  const formattedPrice = isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2)

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <div style={{ cursor: 'pointer' }} onClick={handleDetails}>
          <Image
            src={imageSrc}
            alt={productName}
            width={300}
            height={320}
            className="card-img-top"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="card-body bg-light d-flex flex-column justify-content-between">
          <div>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={handleDetails}
              className="card-title text-truncate"
            >
              {productName}
            </h5>
            <p className="fw-bold">R$ {formattedPrice}</p>
          </div>

          <div>
            <button
              className="btn btn-dark d-block w-100 mb-2"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
            >
              Adicionar no carrinho
            </button>

            {onAddToFavorite && (
              <button
                className="btn btn-outline-danger d-block w-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToFavorite(product)
                }}
              >
                Favoritar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}