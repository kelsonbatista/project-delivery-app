import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FOUR } from '../../helpers/constants';

function OrderCard(props) {
  const { order, role } = props;

  useEffect(() => {
    console.log(role);
  }, []);

  const handleColors = () => {
    if (order.status === 'Preparando') {
      return 'green';
    }
    if (order.status === 'Entregue') {
      return 'cian';
    }
    return 'warning';
  };

  return (
    <Link
      className="order__link order__card"
      to={ `/${role}/orders/${order.id}` }
    >
      <div className="order__column">
        <div className="flex flex-col justify-between items-center h-[100%]">
          Pedido
          <span
            data-testid={ role === 'customer'
              ? `customer_orders__element-order-id-${order.id}`
              : `seller_orders__element-order-id-${order.id}` }
          >
            {(order.id).toString().padStart(FOUR, '0')}
          </span>
        </div>
      </div>
      <div>
        <div
          data-testid={ role === 'customer'
            ? `customer_orders__element-delivery-status-${order.id}`
            : `seller_orders__element-delivery-status-${order.id}` }
          className={ `order__status ${handleColors()}` }
        >
          {order.status}
        </div>
      </div>
      <div className="order__column">
        <div
          data-testid={ role === 'customer'
            ? `customer_orders__element-order-date-${order.id}`
            : `seller_orders__element-order-date-${order.id}` }
        >
          {new Date(order.saleDate).toLocaleDateString('pt-BR')}
        </div>
        <div className="flex">
          <div>
            R$&nbsp;
          </div>
          <div
            data-testid={ role === 'customer'
              ? `customer_orders__element-card-price-${order.id}`
              : `seller_orders__element-card-price-${order.id}` }
          >
            {order.totalPrice.replace('.', ',')}
          </div>
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    sales: PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
      saleDate: PropTypes.string,
      totalPrice: PropTypes.string,
    }),
  }),
}.isRequired;

export default OrderCard;
