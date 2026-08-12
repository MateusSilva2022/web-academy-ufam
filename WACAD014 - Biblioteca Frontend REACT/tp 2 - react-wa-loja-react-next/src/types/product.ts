export interface Product {
  id: number | string
  name?: string
  price?: number | string
  image?: string
  quantity?: number
  nome?: string
  preco?: number | string
  fotos?: Array<{
    src: string
    titulo?: string
  }>
}

