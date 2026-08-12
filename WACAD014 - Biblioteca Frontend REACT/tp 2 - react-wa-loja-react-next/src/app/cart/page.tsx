'use client'

import CartSummary from '../../components/CartSummary'
import CartList from '../../components/CartList'
import { useCart } from '../../context/CartContext'

export default function Cart() {
  const { items, removeFromCart } = useCart()

  const totalItems = items.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  )

  const totalPrice = items.reduce((total, item) => {
    const rawPrice = item.price ?? item.preco ?? 0
    const numericPrice =
      typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice
    const validPrice = isNaN(numericPrice) ? 0 : numericPrice

    return total + validPrice * (item.quantity || 1)
  }, 0)

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">
              Produtos selecionados
            </h5>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Valor Unitário</th>
                    <th>Quantidade</th>
                    <th>Valor Total</th>
                    <th>Opções</th>
                  </tr>
                </thead>

                <CartList
                  items={items}
                  removeItemFromCart={removeFromCart}
                />
              </table>
            </div>
          </div>
        </div>

        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
        />
      </div>
    </main>
  )
}