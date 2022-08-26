import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from '../OrderCard';

function OrdersList(props) {
  const { role, orders } = props;
  return (
    <div>
      <div className="orders__list">
        { orders && orders
          .map((order) => (
            <OrderCard key={ order.id } order={ order } role={ role } />
          ))}
      </div>
    </div>
  );
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(Object),
}.isRequired;

export default OrdersList;
