import React from 'react';
// import Button from 'react-bootstrap/Button';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

// const cartStyles = {
// position: 'fixed',
// bottom: 0,
// };

// const btnStyles = {
// borderBottomLeftRadius: '0px',
// };

function CartLayer({ value }) {
  const navigate = useNavigate();

  return (
    <div>

      <button
        type="button"
        // style={ btnStyles }
        disabled={ value === 0.00 || value === '0.00' }
        data-testid="customer_products__button-cart"
        onClick={ () => { navigate('/customer/checkout', { replace: true }); } }
        className="product__cart"
      >
        <BsCart4 className="product__cart-icon" />
        R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {(Number(value).toFixed(2)).replace('.', ',')}

        </span>

      </button>

    </div>

  );
}

CartLayer.propTypes = {
  value: Proptypes.number,
}.isRiquerided;

export default CartLayer;
