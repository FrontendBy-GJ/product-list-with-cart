import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeFromCart, selectCartItems, selectCartTotal } from './cartSlice';
import { formatToUSDCurrency } from '@/utils/utils';
import removeSvg from '@/assets/icon-remove-item.svg';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const totalItemsInCart = Object.values(cartItems).reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  return (
    <aside className="cart">
      <h2>Your Cart ({totalItemsInCart})</h2>
      <ul>
        {Object.values(cartItems).map((item) => {
          const { name, price, quantity } = item;
          const orderTotal = price * quantity;

          return (
            <li key={name}>
              <span className="item-name">{name}</span>
              <div className="item-details">
                <span className="item-details__qty">{quantity}x</span>
                <span className="item-details__price">
                  @{formatToUSDCurrency(price)}
                </span>
                <span className="item-details__total">
                  {formatToUSDCurrency(orderTotal)}
                </span>
              </div>
              <button
                aria-label={`Remove ${name}`}
                onClick={() => dispatch(removeFromCart(item))}
              >
                <img src={removeSvg} alt="remove item" />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="order-total">
        <span>Order Total</span>
        <span>{formatToUSDCurrency(cartTotal)}</span>
      </div>
    </aside>
  );
};

export default Cart;
