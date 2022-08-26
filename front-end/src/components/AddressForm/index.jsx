import React, { useEffect, useState } from 'react';
// import * as Hook from 'react-hook-form';
// import decode from 'jwt-decode';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { getStorage, removeStorage } from '../../helpers/localStorage';
// import CustomInput from '../Input';
// import CustomSelect from '../Select';
// import addressSchema from '../../helpers/schemas/address.schema';
import { postSales } from '../../services/sales.services';
import { getSellers } from '../../services/user.services';
// import Button from '../Button';
function AddressForm() {
  // const { register, handleSubmit, formState: { errors } } = Hook
  //   .useForm({ resolver: yupResolver(addressSchema) });
  const [sellers, setSellers] = useState([]);
  const [vendedor, setVendedor] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // const TWELVE = 12;
  // const SIX = 6;
  const cart = getStorage('carrinho') || [];
  const navigate = useNavigate();
  // const user = getStorage('user');
  // const location = useLocation();
  const handleSellers = async () => {
    const allSellers = await getSellers();
    setSellers(allSellers);
    return allSellers;
  };
  // const onSubmit = async (loginData) => {
  //   const total = cart
  //     .reduce((acc, product) => acc + (product.price * product.quantity), 0);
  //   const order = {
  //     sellerId: Number(loginData.vendedor),
  //     totalPrice: Number(total),
  //     deliveryAddress: loginData.endereco,
  //     deliveryNumber: loginData.numero,
  //     products: cart,
  //   };
  //   const sales = await postSales(order);
  //   removeStorage('carrinho');
  //   const from = location?.state?.from?.pathname || `/customer/orders/${sales.id}`;
  //   navigate(from, { replace: true });
  // };
  useEffect(() => {
    handleSellers();
  }, []);
  const submitForm = async () => {
    setErrorMessage('');
    try {
      const total = cart
        .reduce((acc, product) => acc + (product.price * product.quantity), 0);
      const order = {
        sellerId: vendedor,
        totalPrice: Number(total),
        deliveryAddress: endereco,
        deliveryNumber: numero,
        products: cart,
      };
      const sales = await postSales(order);
      removeStorage('carrinho');
      navigate(`/customer/orders/${sales.id}`);
    } catch (err) {
      const response = err?.response?.data?.message || err?.message;
      setErrorMessage(response);
    }
  };
  useEffect(() => {
    if (vendedor.length > 0
        && endereco.length > 0
        && numero.length > 0) {
      setDisable(false);
    } else { setDisable(true); }
  }, [vendedor, endereco, numero]);

  return (
    <div className="address">
      <div className="body__title3">Detalhes e Endereço para Entrega</div>
      <form
        autoComplete="off"
        autoCapitalize="off"
        className="address__form"
      >
        <div className="address__form-group">
          <label className="" htmlFor="vendedor">
            Vendedor
            <select
              id="vendedor"
              name="vendedor"
              placeholder="Vendedor"
              className="form__input w-[87vw] md:w-[100%]"
              data-testid="customer_checkout__select-seller"
              onChange={ (e) => setVendedor(e.target.value) }
              required
              // { ...register('vendedor') }
            >
              <option value="">Selecione</option>
              {sellers.map((option) => (
                <option key={ option.id } value={ option.id }>{option.name}</option>
              ))}
            </select>
          </label>
          <label className="" htmlFor="endereco">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              id="endereco"
              name="endereco"
              type="text"
              placeholder="Endereço"
              className="form__input w-[87vw] md:w-[48vw]"
              onChange={ (e) => setEndereco(e.target.value) }
              required
              // { ...register('endereco') }
            />
          </label>
          <label className="" htmlFor="numero">
            Número
            <input
              data-testid="customer_checkout__input-addressNumber"
              id="numero"
              name="numero"
              type="text"
              placeholder="Número"
              className="form__input w-[87vw] md:w-[100%]"
              onChange={ (e) => setNumero(e.target.value) }
              required
              // { ...register('numero') }
            />
          </label>
        </div>
        <div>{errorMessage}</div>
        {/* <div>
          {errors && (
            <div
              className="form__error-msg"
              role="alert"
            >
              {errors.message}
              {errors.vendedor.message || errors.endereco.message
               || errors.numero.message}
            </div>
          )}
        </div> */}
        <div className="address__form-bottom">
          <button
            className="address__button"
            type="button"
            data-testid="customer_checkout__button-submit-order"
            disabled={ disable }
            onClick={ () => submitForm() }
          >
            Finalizar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddressForm;
