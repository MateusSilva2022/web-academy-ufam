'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Navbar from "@/components/Navbar"
import { getFavorites, removeFavorite } from "@/services/favorites.service"
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


  const { data: favorites = [], isLoading, isError } = useQuery<FavoriteItem[]>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    retry: 1,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => removeFavorite(id),
    onSuccess: () => {
      toast.success("Produto removido dos favoritos!")
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: () => {
      toast.error("Erro ao remover dos favoritos.")
    },
  })

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container p-5 text-center">
          <div className="spinner-border text-primary my-4" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="text-muted">Carregando favoritos...</p>
        </main>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <main className="container p-5 text-center">
          <div className="alert alert-danger" role="alert">
            Erro ao carregar a lista de favoritos. Verifique se o recurso existe no MockAPI.
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

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
            </div>
          </div>
        </div>
      </main>
    </>
  )
}