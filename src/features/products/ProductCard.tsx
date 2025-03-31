import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { formatToUSDCurrency } from '@/utils/utils';
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
} from '../cart/cartSlice';
import { SVGProps, useState } from 'react';
import CartIcon from '@/assets/icon-add-to-cart.svg';

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
              <DecrementIcon aria-hidden="true" />
            </button>
            <span aria-label={`Quantity: ${itemQty}`}>{itemQty}</span>
            <button
              title="Increment"
              aria-label={`Increment ${name}. Current quantity: ${itemQty}`}
              onClick={() => handleQtyChange('increment')}
            >
              <IncrementIcon aria-hidden="true" />
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

function DecrementIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="2"
      fill="none"
      viewBox="0 0 10 2"
    >
      <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
    </svg>
  );
}

function IncrementIcon(props: SVGProps<SVGSVGElement>) {
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
        fill="#fff"
        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
      />
    </svg>
  );
}
