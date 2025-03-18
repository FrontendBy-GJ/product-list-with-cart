import { formatToUSDCurrency } from '@/utils/utils';

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
  const { category, image, name, price } = product;
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
    </article>
  );
};

export default ProductCard;
