import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeFromCart, selectCartItems, selectCartTotal } from './cartSlice';
import { formatToUSDCurrency } from '@/utils/utils';
import removeSvg from '@/assets/icon-remove-item.svg';
import carbonIcon from '@/assets/icon-carbon-neutral.svg';
import emptyCart from '@/assets/illustration-empty-cart.svg';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const totalItemsInCart = Object.values(cartItems).reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  let cartContent: React.ReactNode;

  if (!Object.entries(cartItems).length) {
    cartContent = (
      <>
        <img role="presentation" aria-hidden="true" src={emptyCart} alt="" />
        <p>Your added items will appear here</p>
      </>
    );
  } else {
    cartContent = (
      <>
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
        <div className="delivery-msg">
          <img src={carbonIcon} alt="carbon neutral" />
          <p>
            This is a <span>carbon-neutral</span> delivery
          </p>
        </div>
        <button className="confirm-order-btn">Confirm Order</button>
      </>
    );
  }

  return (
    <aside className="cart">
      <h2>Your Cart ({totalItemsInCart})</h2>
      {cartContent}
    </aside>
  );
};

export default Cart;
