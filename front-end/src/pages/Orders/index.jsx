import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import OrdersList from '../../components/OrdersList';
import Header from '../../components/Header';
import { getUserOrders } from '../../services/sales.services';
import { getStorage } from '../../helpers/localStorage';
import { setUserOrders } from '../../store/actions/sales.action';

function Orders(props) {
  const { role } = useParams();
  const { orders, dispatchUserOrders } = props;
  const user = getStorage('user') || [];
  const decoded = decode(user.token);
  const { id } = decoded.userInfo;
  // const [orders, setOrders] = useState([]);
  // const userRole = (user.role === 'administrator' || user.role === 'seller');

  const handleUserOrders = async () => {
    const userOrders = await getUserOrders(role, id);
    dispatchUserOrders(userOrders);
    // setOrders(userOrders);
    return userOrders;
  };

  useEffect(() => {
    handleUserOrders();
  }, []);

  return (
    <main>
      <section className="checkout w-screen h-screen pt-[120px] pb-[100px]">
        <div>
          <Header />
        </div>
        <div className="body__screen mx-auto">
          <div className="mb-10 body__title2">Pedidos</div>
          { (orders.length > 0)
            ? (
              <OrdersList role={ role } orders={ orders } />
            )
            : 'Não há pedidos realizados.'}
        </div>
      </section>
    </main>
  );
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  dispatchUserOrders: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  orders: state.userOrders,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserOrders: (role, id) => dispatch(setUserOrders(role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
