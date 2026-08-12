import { Product } from '@/types/product'
import { productsApi } from '@/lib/api'

export async function getProducts(): Promise<Product[]> {
  const response = await productsApi.get('/produto')
  const rawProducts = response.data as Product[]

  return rawProducts.map((product) => {
    const rawPrice = product.price ?? product.preco ?? 0
    const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice

    return {
      ...product,
      id: product.id,
      name: product.name || product.nome || 'Produto sem nome',
      price: Number.isNaN(numericPrice) ? 0 : numericPrice,
      image: product.image || product.fotos?.[0]?.src || '/placeholder.png',
      quantity: product.quantity ?? 1,
    }
  })
}
