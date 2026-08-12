import { Product } from '@/types/product'
import { productsApi } from '@/lib/api'

export async function getProducts(): Promise<Product[]> {
  const response = await productsApi.get('/produto')
  return response.data
}
