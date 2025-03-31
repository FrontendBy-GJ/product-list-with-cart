import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeFromCart, selectCartItems, selectCartTotal } from './cartSlice';
import { formatToUSDCurrency } from '@/utils/utils';
import carbonIcon from '@/assets/icon-carbon-neutral.svg';
import emptyCart from '@/assets/illustration-empty-cart.svg';
import { confirmOrder } from '@/features/confirmation-modal/modalSlice';
import { SVGProps } from 'react';

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
      <div className="empty-cart">
        <img role="presentation" aria-hidden="true" src={emptyCart} alt="" />
        <p>Your added items will appear here</p>
      </div>
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
                  <RemoveSVG aria-hidden="true" />
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

function RemoveSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
    >
      <path
        fill="#CAAFA7"
        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
      />
    </svg>
  );
}
