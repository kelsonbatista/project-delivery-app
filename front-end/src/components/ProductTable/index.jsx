import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { getStorage, removeFromCheckout } from '../../helpers/localStorage';

function ProductTable() {
  const [cart, setCart] = useState(getStorage('carrinho'));
  const total = cart
    .reduce((acc, product) => acc + (product.price * product.quantity), 0);

  const removeItem = (id) => {
    removeFromCheckout(id);
    const newCart = getStorage('carrinho') || [];
    setCart(newCart);
  };

  return (
    <div>
      <div>
        <div className="flex">
          <div className="w-[6%] product__table-header">Item</div>
          <div className="w-[10%] product__table-header">&nbsp;</div>
          <div className="w-[34%] product__table-header">Descrição</div>
          <div className="w-[10%] product__table-header">
            <span className="hidden sm:block">Quantidade</span>
            <span className="sm:hidden">Qtde</span>
          </div>
          <div className="w-[15%] product__table-header">
            <span className="hidden lg:block">Valor Unitário</span>
            <span className="lg:hidden">Valor</span>
          </div>
          <div className="w-[15%] product__table-header">
            <span className="hidden sm:block">Sub-Total</span>
            <span className="sm:hidden">Sub</span>
          </div>
          <div className="w-[10%] product__table-header">
            <span className="hidden sm:block">Remover</span>
            <span className="sm:hidden">X</span>
          </div>
        </div>
        { cart.length
          && cart.map((product, index) => (
            <div key={ product.id } className="flex">
              <div
                className="w-[6%] product__table-body"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </div>
              <div className="w-[10%] product__table-body">
                <img
                  src={ product.urlImage }
                  alt={ product.name }
                  className="w-[50px]"
                />
              </div>
              <div
                className="w-[34%] product__table-body justify-start"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product.name }
              </div>
              <div
                className="w-[10%] product__table-body"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { product.quantity }
              </div>
              <div
                className="w-[15%] product__table-body"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { Number(product.price).toFixed(2).replace('.', ',') }
              </div>
              <div
                className="w-[15%] product__table-body"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { (product.price * product.quantity).toFixed(2).replace('.', ',') }
              </div>
              <div
                className="w-[10%] product__table-body"
              >
                <button
                  onClick={ () => removeItem(product.id) }
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  <FaRegTrashAlt
                    size="22px"
                    style={ { cursor: 'pointer' } }
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="body__screen flex justify-end border-b-2 py-8">
        <div
          className="product__total"
        >
          Total R$ &nbsp;
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {(total.toFixed(2)).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
