/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { CgAddR, CgRemoveR } from 'react-icons/cg';
import {
  addItemStorage,
  getStorage,
  InputItem, removeInputItem, removeItemStorage } from '../../helpers/localStorage';

function ProductCard({ data, updateValue }) {
  const [quantity, setQuantity] = useState(0);
  const { name, id, urlImage, price } = data;
  const notFound = -1;

  useEffect(() => {
    updateValue();
  }, [quantity, updateValue]);

  useEffect(() => {
    const storage = getStorage('carrinho') || [];
    const itemIndex = storage.findIndex((item) => item.id === id);
    if (itemIndex !== notFound) {
      setQuantity(storage[itemIndex].quantity);
    } else {
      setQuantity(0);
    }
  }, [id, notFound]);

  const addProducts = () => { // adiciona produto ao localStorage no clique do botão +
    if (quantity >= 0) {
      setQuantity(quantity + 1);
      addItemStorage({ name, id, price, urlImage, quantity: quantity + 1 });
    }
  };
  const removeProducts = () => { // remove produto ao localStorage no clique do botão -
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeItemStorage({ name, id, price, urlImage, quantity: quantity - 1 });
    }
  };

  const handleInputChange = ({ target }) => {
    const value = Number(target.value);
    if (value < 0 || value === 0) {
      setQuantity(0);

      removeInputItem({ name, id, price, urlImage, quantity: 0 });
    } else {
      setQuantity(value);
      InputItem({ name, id, price, urlImage, quantity: value });
    }
  };

  return (
    <section key={ id }>
      <div className="product__card">
        <h3
          className="product__price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `${Number(price).toFixed(2).replace('.', ',')}` }

        </h3>
        <img
          className="product__image"
          src={ urlImage }
          alt="product"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <div>
          <div
            data-testid={ `customer_products__element-card-title-${id}` }
            className="product__title"
          >
            { name }

          </div>
        </div>
        <div className="product__quantity">
          <button
            type="button"
            onClick={ addProducts }
            data-testid={ `customer_products__button-card-add-item-${id}` }
            className="product__btn product__btn-left"
          >
            {' '}
            +
            {/* <CgAddR
              size="30px"
              color="rgba(0, 100, 0, 0.85)"
            /> */}
          </button>
          <input
            type="number"
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className="product__input"
            value={ quantity }
            onChange={ (e) => handleInputChange(e) }
          />
          <button
            type="button"
            onClick={ removeProducts }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="product__btn product__btn-right"
          >
            {' '}
            -
            {/* <CgRemoveR
              size="30px"
              color="rgba(255, 0, 0, 0.85)"
            /> */}
          </button>
        </div>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  data: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  updateValue: PropTypes.func,
}.isRequired;

export default ProductCard;
