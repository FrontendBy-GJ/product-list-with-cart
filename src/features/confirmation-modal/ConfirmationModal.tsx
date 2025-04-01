import { useAppDispatch, useAppSelector } from '@/app/hooks';
import confirmIcon from '@/assets/icon-order-confirmed.svg';
import {
  selectCartItems,
  clearCart,
  selectCartTotal,
} from '@/features/cart/cartSlice';
import { formatToUSDCurrency } from '@/utils/utils';
import { useEffect, useRef } from 'react';
import { confirmOrder, selectOrderConfirmed } from './modalSlice';

const ConfirmationModal = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const orderConfirmed = useAppSelector(selectOrderConfirmed);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleNewOrder = () => {
    dispatch(clearCart());
    dispatch(confirmOrder(false));
  };

  useEffect(() => {
    if (orderConfirmed) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [orderConfirmed]);

  return (
    <dialog ref={modalRef} onClose={() => dispatch(confirmOrder(false))}>
      <header>
        <img src={confirmIcon} alt="" aria-hidden="true" />
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
      </header>
      <section>
        <dl>
          {Object.values(cartItems).map((item) => {
            const { image, name, price, quantity } = item;
            const itemTotal = price * quantity;
            const itemID = `cart-item-${name
              .replace(/\s+/g, '-')
              .toLowerCase()}`;

            return (
              <div
                className="order-details"
                key={name}
                role="group"
                aria-labelledby={itemID}
              >
                <img
                  className="order-details__img"
                  src={image.thumbnail}
                  alt={name}
                />
                <div>
                  <dt id={itemID} className="order-details__name">
                    {name}
                  </dt>
                  <dd>
                    <span className="order-details__qty">
                      {quantity} <span aria-hidden>x</span>
                    </span>{' '}
                    <span className="order-details__item-price">
                      @{formatToUSDCurrency(price)}
                    </span>
                  </dd>
                </div>
                <dd className="order-details__subtotal">
                  <span className="sr-only">Subtotal: </span>
                  {formatToUSDCurrency(itemTotal)}
                </dd>
              </div>
            );
          })}
        </dl>
        <div className="modal-order-total">
          <span className="modal-order-total__text">Order Total</span>
          <span className="modal-order-total__total-price">
            {formatToUSDCurrency(cartTotal)}
          </span>
        </div>
      </section>
      <footer>
        <button onClick={handleNewOrder}>Start New Order</button>
      </footer>
    </dialog>
  );
};

export default ConfirmationModal;
