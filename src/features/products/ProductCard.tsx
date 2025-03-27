import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { formatToUSDCurrency } from '@/utils/utils';
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
} from '../cart/cartSlice';
import { useState } from 'react';
import CartIcon from '@/assets/icon-add-to-cart.svg';
import DecrementIcon from '@/assets/icon-decrement-quantity.svg';
import IncrementIcon from '@/assets/icon-increment-quantity.svg';

export type ProductType = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

const ProductCard = (product: ProductType) => {
  const [itemQty, setItemQty] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { category, image, name, price } = product;
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectCartItems);

  const handleQtyChange = (action: 'increment' | 'decrement') => {
    if (action === 'decrement') {
      if (itemQty === 1) {
        dispatch(removeFromCart(product));
        setIsAddedToCart(false);
      } else {
        setItemQty((prev) => prev - 1);
        dispatch(decreaseQty(product));
      }
    } else {
      setItemQty((prev) => prev + 1);
      dispatch(increaseQty(product));
    }
  };

  const addItemToCart = (item: ProductType) => {
    setItemQty(1);
    setIsAddedToCart(true);
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  return (
    <article>
      <picture data-in-cart={`${item[name]?.quantity && 'true'}`}>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <img src={image.mobile} alt={name} />

        {isAddedToCart && item[name]?.quantity ? (
          <div className="qty-stepper">
            <button
              title="Decrement"
              aria-label={`Decrement ${name}. Current quantity: ${itemQty}`}
              onClick={() => handleQtyChange('decrement')}
            >
              <img src={DecrementIcon} alt="" aria-hidden="true" />
            </button>
            <span aria-label={`Quantity: ${itemQty}`}>{itemQty}</span>
            <button
              title="Increment"
              aria-label={`Increment ${name}. Current quantity: ${itemQty}`}
              onClick={() => handleQtyChange('increment')}
            >
              <img src={IncrementIcon} alt="" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => addItemToCart({ ...product })}
          >
            <img src={CartIcon} alt="" aria-hidden="true" />
            Add to Cart
          </button>
        )}
      </picture>
      <span className="category">{category}</span>
      <h3 className="product-name">{name}</h3>
      <span className="product-price">{formatToUSDCurrency(price)}</span>
    </article>
  );
};

export default ProductCard;
