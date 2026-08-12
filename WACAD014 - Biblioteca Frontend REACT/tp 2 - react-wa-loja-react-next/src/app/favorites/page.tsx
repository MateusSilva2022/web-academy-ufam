'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFavorites, removeFavorite, FavoritesPaginationResponse } from "@/services/favorites.service"
import { getStoredUser } from '@/lib/auth'
import { toast } from "sonner"

interface FavoriteItem {
  id: string | number
  nome?: string
  name?: string
  preco?: string | number
  price?: string | number
}

export default function FavoritesPage() {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const [currentUser] = useState(() => getStoredUser())

  const { data, isLoading, isError } = useQuery<FavoritesPaginationResponse>({
    queryKey: ['favorites', currentUser?.id, currentPage, pageSize],
    queryFn: async () => {
      if (!currentUser?.id) {
        return {
          items: [],
          total: 0,
          page: currentPage,
          limit: pageSize,
          totalPages: 1,
        }
      }

      const response = await getFavorites({ page: currentPage, limit: pageSize, userId: currentUser.id })
      if (Array.isArray(response)) {
        const total = response.length
        return {
          items: response,
          total,
          page: currentPage,
          limit: pageSize,
          totalPages: Math.max(1, Math.ceil(total / pageSize)),
        }
      }
      return response
    },
    enabled: Boolean(currentUser?.id),
    retry: 1,
  })

  const favorites = (data?.items || []) as FavoriteItem[]
  const totalPages = data?.totalPages || 1

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => {
      if (!currentUser?.id) {
        throw new Error('AUTH_REQUIRED')
      }

      return removeFavorite(id, currentUser.id)
    },
    onSuccess: () => {
      toast.success("Produto removido dos favoritos!")
      setCurrentPage(1)
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: (error: Error) => {
      if (error.message === 'AUTH_REQUIRED') {
        toast.error('Faça login para gerenciar seus favoritos.')
        return
      }

      toast.error("Erro ao remover dos favoritos.")
    },
  })

  if (!currentUser?.id) {
    return (
      <main className="container p-5 text-center">
        <div className="alert alert-warning" role="alert">
          Faça login para visualizar seus favoritos.
        </div>
        <Link href="/login" className="btn btn-dark">
          Ir para login
        </Link>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="container p-5 text-center">
        <div className="spinner-border text-primary my-4" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="text-muted">Carregando favoritos...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="container p-5 text-center">
        <div className="alert alert-danger" role="alert">
          Erro ao carregar a lista de favoritos.
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">
              Produtos Favoritos
            </h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-muted">
                        Nenhum produto favoritado ainda.
                      </td>
                    </tr>
                  ) : (
                    favorites.map((item) => {
                      const productName = item.nome || item.name || 'Produto sem nome'
                      const rawPrice = item.preco ?? item.price ?? 0
                      const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice
                      const formattedPrice = isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2)

                      return (
                        <tr key={item.id}>
                          <td>{productName}</td>
                          <td>R$ {formattedPrice}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteMutation.mutate(item.id)}
                              disabled={deleteMutation.isPending}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <nav aria-label="Paginação de favoritos" className="mt-3">
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    >
                      Anterior
                    </button>
                  </li>
                  <li className="page-item disabled">
                    <span className="page-link">
                      Página {currentPage} de {totalPages}
                    </span>
                  </li>
                  <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    >
                      Próxima
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
