'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import CartSummary from '../components/CartSummary'
import ProductList from '../components/ProductList'

import { getProducts } from '@/services/products.service'
import { useAddFavorite } from '@/hooks/favorites/useAddFavorite'
import { getStoredUser } from '@/lib/auth'
import { Product } from '@/types/product'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'

export default function Products() {
  const router = useRouter()
  const { items, addToCart } = useCart()
  const { addFavorite } = useAddFavorite()

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })


  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0)


  const totalPrice = items.reduce((acc, item) => {
    const rawPrice = item.price ?? 0 // TODO: Verificar retorno de api
    const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice
    const validPrice = isNaN(numericPrice) ? 0 : numericPrice

    return acc + validPrice * (item.quantity || 1)
  }, 0)

  if (isLoading) {
    return (
      <main className="container p-5 text-center">
        <div className="spinner-border text-primary my-4" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="text-muted">Carregando produtos...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="container p-5 text-center">
        <div className="alert alert-danger" role="alert">
          Erro ao carregar os produtos. Tente recarregar a página.
        </div>
      </main>
    )
  }

  const handleAddToFavorite = async (product: Product) => {
    const user = getStoredUser()
    if (!user?.id) {
      toast.error('Faça login para favoritar produtos')
      router.push('/login')
      return
    }

    await addFavorite(product)
  }

  return (
    <main>
      <div className="container p-5">
        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
        />

        <h5 className="mb-3">Produtos disponíveis:</h5>

        <ProductList
          products={products}
          onAddToCart={addToCart}
          onAddToFavorite={handleAddToFavorite}
        />

      </div>
    </main>
  )
}
