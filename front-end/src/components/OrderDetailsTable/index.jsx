import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { setOrderStatus, getOrderDetails } from '../../services/sales.services';
import { setStorage, getStorage } from '../../helpers/localStorage';

function OrderDetailsTable(props) {
  const { details, user } = props;
  const [status, setStatus] = useState('');
  const [button, setButton] = useState(false);
  const total = details[0].products
    .reduce((acc, product) => acc + (product.price * product.SaleProduct.quantity), 0);

  const handleStatus = (newStatus) => {
    const getButton = getStorage('button');
    if (newStatus === 'Preparando') {
      setStorage('button', { ...getButton,
        preparando: true,
        transito: false });
    } else if (newStatus === 'Em Trânsito') {
      setStorage('button', { ...getButton,
        entregue: false,
        preparando: true,
        transito: true });
    } else if (newStatus === 'Entregue') {
      setStorage('button', { ...getButton,
        entregue: true,
        preparando: true,
        transito: true });
    } else {
      setStorage('button', { ...getButton,
        entregue: true,
        preparando: false,
        transito: true });
    }
  };

  const handleClick = async (newStatus) => {
    const newOrderStatus = await setOrderStatus(newStatus, details[0].id);
    handleStatus(newStatus);
    setStatus(newOrderStatus.statusChangedTo);
  };

  const handleOrderDetails = async () => {
    const order = await getOrderDetails(details[0].id);
    setStatus(order.status);
    handleStatus(order.status);
  };

  useEffect(() => {
    handleOrderDetails();
    const statusStorage = getStorage('button')
    || { entregue: true, preparando: false, transito: true };
    setStorage('button', statusStorage);
  }, []);

  useEffect(() => {
    const buttonStorage = getStorage('button');
    setButton(buttonStorage);
  }, [status]);

  return (
    <div>
      { details && details.map((order) => (
        <div key={ order.id } className="flex mb-10">
          <div
            className="w-[20%] product__table-header"
            data-testid={ user.role === 'customer'
              ? 'customer_order_details__element-order-details-label-order-id'
              : 'seller_order_details__element-order-details-label-order-id' }
          >
            { `Pedido ${order.id}` }
          </div>
          <div
            className="w-[30%] product__table-header"
            data-testid={ user.role === 'customer'
              ? 'customer_order_details__element-order-details-label-seller-name'
              : 'seller_order_details__element-order-details-label-seller-name' }
          >
            <span
              className="hidden lg:block"
            >
              { `Ponto de Venda: ${order.seller.name}` }
            </span>
            <span className="lg:hidden">{ `Venda: ${order.seller.name}` }</span>
          </div>
          <div
            className="w-[25%] product__table-header"
            data-testid={ user.role === 'customer'
              ? 'customer_order_details__element-order-details-label-order-date'
              : 'seller_order_details__element-order-details-label-order-date' }
          >
            { `${new Date(order.saleDate).toLocaleDateString('pt-BR')}` }
          </div>
          <div
            className="w-[25%] product__table-header"
            data-testid={ user.role === 'customer'
              ? 'customer_order_details__element-order-details-label-delivery-status'
              : 'seller_order_details__element-order-details-label-delivery-status' }
          >
            { `${status}` }
          </div>
        </div>
      ))}
      { user.role === 'customer' && (
        <div
          className="w-[100%] flex items-center justify-center mb-4 mt-[-15px]"
        >
          <button
            type="button"
            className="form__button text-nowrap"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ button.entregue }
            onClick={ () => handleClick('Entregue') }
          >
            Marcar como entregue
          </button>
        </div>
      )}
      { user.role === 'seller' && (
        <div className="flex items-center justify-center text-center mb-4 mt-[-15px]">
          <div className="w-[50%]">
            <button
              type="button"
              className="form__button text-nowrap"
              data-testid="seller_order_details__button-preparing-check"
              disabled={ button.preparando }
              onClick={ () => handleClick('Preparando') }
            >
              Preparar Pedido
            </button>
          </div>
          <div className="w-[50%]">
            <button
              type="button"
              className="form__button text-nowrap"
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ button.transito }
              onClick={ () => handleClick('Em Trânsito') }
            >
              Saiu para entrega
            </button>
          </div>
        </div>
      )}
      <div>
        <div className="flex">
          <div className="w-[6%] product__table-header">#ID</div>
          <div className="w-[10%] product__table-header">&nbsp;</div>
          <div className="w-[39%] product__table-header">Descrição</div>
          <div className="w-[15%] product__table-header">Qtde</div>
          <div className="w-[15%] product__table-header">Valor</div>
          <div className="w-[15%] product__table-header">
            <span className="hidden sm:block">Sub-Total</span>
            <span className="sm:hidden">Sub</span>
          </div>
        </div>
        { details && details[0].products.map((order, index) => (
          <div key={ order.id } className="flex">
            <div
              className="w-[6%] product__table-body"
              data-testid={ user.role === 'customer'
                ? `customer_order_details__element-order-table-item-number-${index}`
                : `seller_order_details__element-order-table-item-number-${index}` }
            >
              { order.id }
            </div>
            <div className="w-[10%] product__table-body">
              <img
                src={ order.urlImage }
                alt={ order.name }
                className="w-[50px]"
              />
            </div>
            <div
              className="w-[39%] product__table-body justify-start"
              data-testid={ user.role === 'customer'
                ? `customer_order_details__element-order-table-name-${index}`
                : `seller_order_details__element-order-table-name-${index}` }
            >
              { order.name }
            </div>
            <div
              className="w-[15%] product__table-body"
              data-testid={ user.role === 'customer'
                ? `customer_order_details__element-order-table-quantity-${index}`
                : `seller_order_details__element-order-table-quantity-${index}` }
            >
              { order.SaleProduct.quantity }
            </div>
            <div
              className="w-[15%] product__table-body"
              data-testid={ user.role === 'customer'
                ? `customer_order_details__element-order-table-unit-price-${index}`
                : `seller_order_details__element-order-table-unit-price-${index}` }
            >
              { (Number(order.price).toFixed(2)).replace('.', ',') }
            </div>
            <div
              className="w-[15%] product__table-body"
              data-testid={ user.role === 'customer'
                ? `customer_order_details__element-order-table-sub-total-${index}`
                : `seller_order_details__element-order-table-sub-total-${index}` }
            >
              { ((order.price * order.SaleProduct.quantity)
                .toFixed(2)).replace('.', ',') }
            </div>
          </div>
        ))}
      </div>
      <div className="body__screen flex justify-end border-b-2 py-8 pb-[150px]">
        <div
          className="product__total"
          data-testid={ user.role === 'customer'
            ? 'customer_order_details__element-order-total-price'
            : 'seller_order_details__element-order-total-price' }
        >
          Total R$&nbsp;
          {(total.toFixed(2)).replace('.', ',')}
        </div>
      </div>
    </div>
  );
}

OrderDetailsTable.propTypes = {
  // role: PropTypes.string,
  id: PropTypes.number,
}.isRequired;

export default OrderDetailsTable;
