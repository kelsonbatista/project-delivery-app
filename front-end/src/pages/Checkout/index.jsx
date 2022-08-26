import ProductTable from '../../components/ProductTable';
import AddressForm from '../../components/AddressForm';
import Header from '../../components/Header';

export default function Checkout() {
  return (
    <main>
      <section className="checkout w-screen h-screen pt-[120px] pb-[100px]">
        <div>
          <Header />
        </div>
        <div className="body__screen mx-auto">
          <div className="mb-10 body__title2">Finalizar Pedido</div>
          <ProductTable />
          <AddressForm />
        </div>
      </section>
    </main>
  );
}
