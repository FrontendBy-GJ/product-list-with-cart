import data from '@/data.json';
import ProductCard from './ProductCard';

const ProductsList = () => {
  return (
    <div className="products-wrapper">
      {data.map((product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
};

export default ProductsList;
