import CartItem from './CartItem'
import { CartItem as CartItemType } from '../types/cart'

interface CartListProps {
  items: CartItemType[]
  removeItemFromCart: (id: number) => void
}

export default function CartList({
  items,
  removeItemFromCart,
}: CartListProps) {
  return (
    <tbody>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeItemFromCart={removeItemFromCart}
        />
      ))}
    </tbody>
  )
}