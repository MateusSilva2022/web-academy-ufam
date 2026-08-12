'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { productsApi } from '@/lib/api'
import { useCart } from '@/context/CartContext'

interface Foto {
  src: string
  titulo: string
}

interface ProdutoDetalhe {
  id: string
  nome: string
  preco: string
  descricao: string
  vendido: string
  fotos: Foto[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.product as string

  const { addToCart } = useCart()

  const { data: product, isLoading, isError } = useQuery<ProdutoDetalhe>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productsApi.get(`/produto/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <main className="container p-5 text-center">
        <p>Carregando detalhes do produto...</p>
      </main>
    )
  }

  if (isError || !product) {
    return (
      <main className="container p-5 text-center">
        <p>Produto não encontrado ou erro ao carregar.</p>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nome,
      price: Number(product.preco),
      image: product.fotos?.[0]?.src || '/placeholder.png',
      quantity: 1,
    })
  }

  return (
    <main className="container p-5">
      <div className="row g-4">
        <div className="col-md-6">
          {product.fotos && product.fotos.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {product.fotos.map((foto, index) => (
                <Image
                  key={index}
                  src={foto.src}
                  alt={foto.titulo || product.nome}
                  width={500}
                  height={400}
                  className="img-fluid rounded shadow-sm"
                  style={{ objectFit: 'cover', width: '100%', maxHeight: '400px' }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{ height: '300px' }}>
              <span>Sem imagem disponível</span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h1 className="mb-3">{product.nome}</h1>
          <h3 className="text-primary mb-3">R$ {product.preco}</h3>
          <p className="text-muted mb-4">{product.descricao}</p>

          <button
            className="btn btn-dark btn-lg w-100"
            onClick={handleAddToCart}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </main>
  )
}
