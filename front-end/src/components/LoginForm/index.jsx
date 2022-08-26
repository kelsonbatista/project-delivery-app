import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import * as Hook from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdAlternateEmail } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../helpers/schemas/login.schema';
import { login } from '../../services/login.services';
import { getStorage } from '../../helpers/localStorage';
// import api from '../../services/api';

function LoginForm() {
  // const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = Hook
    .useForm({ resolver: yupResolver(loginSchema),
      reValidateMode: 'onChange',
      mode: 'onChange' });

  const [errorMessage, setErrorMessage] = useState('');
  const [isShowingPassword, showPassword] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const fromUser = '/customer/products';
  const fromAdmin = '/admin/manage';
  const fromSeller = '/seller/orders';

  const handleToken = () => {
    const storage = getStorage('user') || [];
    // console.log(storage.token);
    if (storage.token) { navigate('/customer/products'); }
  };

  useEffect(() => {
    handleToken();
  }, []);

  const onSubmit = async (loginData) => {
    console.log(loginData);
    setErrorMessage('');

    try {
      const user = await login(loginData.email, loginData.password);
      console.log(user, 'user');
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        const { role } = user;
        if (role === 'administrator') {
          navigate(fromAdmin, { replace: true });
        } else if (role === 'seller') {
          navigate(fromSeller, { replace: true });
        } else {
          navigate(fromUser, { replace: true });
        }
        // axios.interceptors.request.use((config) => {
        //   config.headers.Authorization = `${user.token}`;
        //   return config;
        // }, (error) => { throw error; });

        // eslint-disable-next-line dot-notation
        // axios.defaults.headers.common['Authorization'] = `${user.token}`;
      }
    } catch (err) {
      const response = err?.response?.data?.message || err?.message;
      setErrorMessage(response);
    }
  };

  return (
    <div className="w-[300px]">
      <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" autoCapitalize="off">
        <div
          className={ `mb-3 inline-flex items-center text-sm text-gray-900
          bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600
          dark:text-gray-400 dark:border-gray-600` }
        >
          <input
            id="email"
            data-testid="common_login__input-email"
            className={ `form__input h-[50px] justify-start
              ${errors.email && 'form__error'}` }
            placeholder="Email"
            type="email"
            { ...register('email') }
          />
          <span className="mx-3">
            <MdAlternateEmail
              size="24"
              className="text-gray-400"
            />
          </span>
        </div>
        <div
          className={ `mb-3 inline-flex items-center text-sm text-gray-900
          bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600
          dark:text-gray-400 dark:border-gray-600` }
        >
          <input
            id="password"
            data-testid="common_login__input-password"
            className={ `form__input h-[50px] justify-start
              ${errors.password && 'form__error'}` }
            placeholder="Password"
            type={ isShowingPassword ? 'text' : 'password' }
            { ...register('password', { required: true }) }
          />
          <span className="mx-3">
            {isShowingPassword ? (
              <FiEye
                onClick={ () => showPassword(false) }
                size="24"
                className="text-gray-400"
              />
            ) : (
              <FiEyeOff
                onClick={ () => showPassword(true) }
                size="24"
                className="text-gray-400"
              />
            )}
          </span>
        </div>
        <div
          className="mb-3 form__error-msg"
          data-testid="common_login__element-invalid-email"
        >
          {errors.email?.message || errors.password?.message}
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <button
            className="form__button w-full h-[50px] flex items-center justify-center"
            type="submit"
            data-testid="common_login__button-login"
            disabled={ !isValid }
          >
            Login
          </button>
        </div>
        <div className="mb-3">
          <Link to="/register">
            <button
              className="form__button w-full h-[50px] bg-green-400"
              type="button"
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </Link>
        </div>
        {/* <div className="flex items-center justify-between my-7">
          <Link to="/register" className="hover:text-green">
            Esqueci a senha
          </Link>
          <Link
            to="/register"
            data-testid="common_login__button-register"
            className="hover:text-green"
          >
            Cadastrar
          </Link>
        </div> */}
      </form>
    </div>
  );
}

export default LoginForm;
