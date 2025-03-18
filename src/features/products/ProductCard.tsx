import { useAppDispatch } from '@/app/hooks';
import { formatToUSDCurrency } from '@/utils/utils';
import { addToCart, CartItem } from '../cart/cartSlice';
import { useState } from 'react';

type ProductType = {
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
  const { category, image, name, price } = product;
  const dispatch = useAppDispatch();

  const handleQtyChange = (action: 'increment' | 'decrement') => {
    if (action !== 'decrement' && action !== 'increment')
      throw new Error('Not a valid action');

    if (action === 'decrement') {
      if (itemQty <= 1) return;
      setItemQty((prev) => prev - 1);
    } else if (action === 'increment') {
      setItemQty((prev) => prev + 1);
    }
  };

  const addItemToCart = (item: CartItem) => {
    dispatch(
      addToCart({
        ...item,
        quantity: itemQty,
      })
    );
  };

  return (
    <article>
      <picture>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <img src={image.mobile} alt={name} />
      </picture>
      <span>{category}</span>
      <h3>{name}</h3>
      <span>{formatToUSDCurrency(price)}</span>
      <div>
        <button onClick={() => handleQtyChange('decrement')}>-</button>
        <span>{itemQty}</span>
        <button onClick={() => handleQtyChange('increment')}>+</button>
      </div>
      <button onClick={() => addItemToCart({ name, price, quantity: itemQty })}>
        Add to Cart
      </button>
    </article>
  );
};

export default ProductCard;
