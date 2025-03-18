import ProductsList from './features/products/ProductsList';

function App() {
  return (
    <main>
      <section>
        <h1>Desserts</h1>
        <ProductsList />
      </section>
      {/* Cart */}
      <aside>
        <h2>Your Cart ()</h2>
      </aside>
    </main>
  );
}

export default App;
