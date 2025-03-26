import Cart from '@/features/cart/Cart';
import ProductsList from '@/features/products/ProductsList';
import ConfirmationModal from './features/confirmation-modal/ConfirmationModal';

function App() {
  return (
    <>
      <main>
        <section>
          <h1>Desserts</h1>
          <ProductsList />
        </section>
        <Cart />
      </main>
      <ConfirmationModal />
    </>
  );
}

export default App;
