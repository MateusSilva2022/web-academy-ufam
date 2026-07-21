import { CartItem as CartItemType } from '../types/cart'

interface CartItemProps {
  item: CartItemType
  removeItemFromCart: (id: number) => void
}

export default function CartItem({
  item,
  removeItemFromCart,
}: CartItemProps) {
  return (
    <tr>
      <td>{item.name}</td>

      <td>R$ {item.price.toFixed(2)}</td>

      <td>{item.quantity}</td>

      <td>R$ {(item.price * item.quantity).toFixed(2)}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeItemFromCart(item.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  )
}