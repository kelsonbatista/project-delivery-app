import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderDetailsTable from '../../components/OrderDetailsTable';
import Header from '../../components/Header';
import { getOrderDetails } from '../../services/sales.services';
import { getStorage } from '../../helpers/localStorage';

export default function OrderDetails() {
  const { role, id } = useParams();
  const [details, setDetails] = useState([]);
  const user = getStorage('user') || [];

  const handleDetails = async () => {
    const order = await getOrderDetails(id);
    const newOrder = [order];
    console.log(newOrder, id, 'newOrder');
    setDetails(newOrder);
    return newOrder;
  };

  useEffect(() => {
    handleDetails();
  }, []);

  return (
    <main>
      <section className="checkout w-screen h-screen pt-[120px] pb-[100px]">
        <div>
          <Header />
        </div>
        <div className="body__screen mx-auto">
          <div className="mb-10 body__title2">Detalhes do Pedido</div>
          { console.log(details.length, 'details') }
          { (details.length > 0)
            && <OrderDetailsTable
              role={ role }
              id={ id }
              user={ user }
              details={ details }
            /> }
        </div>
      </section>
    </main>
  );
}
