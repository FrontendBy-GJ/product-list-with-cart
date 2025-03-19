import Cart from '@/features/cart/Cart';
import ProductsList from '@/features/products/ProductsList';

function App() {
  return (
    <main>
      <section>
        <h1>Desserts</h1>
        <ProductsList />
      </section>
      <Cart />
    </main>
  );
}

export default App;
