import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeFromCart, selectCartItems, selectCartTotal } from './cartSlice';
import { formatToUSDCurrency } from '@/utils/utils';
import removeSvg from '@/assets/icon-remove-item.svg';
import carbonIcon from '@/assets/icon-carbon-neutral.svg';
import emptyCart from '@/assets/illustration-empty-cart.svg';
import { confirmOrder } from '@/features/confirmation-modal/modalSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const totalItemsInCart = Object.values(cartItems).reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  const handleConfirmOrder = () => dispatch(confirmOrder(true));

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
        <dl>
          {Object.values(cartItems).map((item) => {
            const { name, price, quantity } = item;
            const orderTotal = price * quantity;
            const itemID = `cart-item-${name
              .replace(/\s+/g, '-')
              .toLowerCase()}`;

            return (
              <div
                key={name}
                role="group"
                aria-labelledby={itemID}
                className="cart-details"
              >
                <div>
                  <dt id={itemID} className="item-name">
                    {name}
                  </dt>
                  <dd className="item-details">
                    <span className="item-details__qty">
                      {quantity}
                      <span aria-hidden="true">x</span>
                    </span>
                    <span className="item-details__price">
                      @{formatToUSDCurrency(price)}
                    </span>
                    <span className="item-details__subtotal">
                      <span className="sr-only">Subtotal: </span>
                      {formatToUSDCurrency(orderTotal)}
                    </span>
                  </dd>
                </div>
                <button
                  aria-label={`Remove ${name}`}
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  <img src={removeSvg} alt="" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </dl>
        <div className="order-total">
          <span>Order Total</span>
          <span>{formatToUSDCurrency(cartTotal)}</span>
        </div>
        <div className="delivery-msg" aria-labelledby="delivery-description">
          <img src={carbonIcon} alt="" aria-hidden="true" />
          <p id="delivery-description">
            This is a <span>carbon-neutral</span> delivery
          </p>
        </div>
        <button onClick={handleConfirmOrder} className="confirm-order-btn">
          Confirm Order
        </button>
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
