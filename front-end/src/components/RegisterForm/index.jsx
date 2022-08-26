import React, { useState, useEffect } from 'react';
// import * as Hook from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../services/register.services';

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const TWELVE = 12;
  const SIX = 6;
  // const location = useLocation();
  // const from = location?.state?.from?.pathname || '/customer/products';

  // const findUser = async (email) => {
  //   const userFound = await users.find((user) => user.email === email);
  //   return userFound;
  // };

  // const onSubmit = async (loginData) => {
  //   setErrorMessage('');

  //   try {
  //      const userFound = await findUser(loginData.email);
  //     // if (!userFound) {
  //     //   const user = {
  //     //     id: users.length + 1,
  //     //     name: loginData.name,
  //     //     email: loginData.email,
  //     //     password: loginData.password,
  //     //     role: 'customer',
  //     //   };
  //     //   localStorage.setItem('delivery@dbUsers', JSON.stringify([...users, user]));
  //     // console.log({ ...loginData, role: 'customer' }, 'loginData');
  //     const user = await registration({ ...loginData, role: 'customer' });
  //     localStorage.setItem('user', JSON.stringify(user));
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     const response = err?.response?.data?.message || err?.message;
  //     setErrorMessage(response);
  //   }
  // };

  // const handleName = ({ target }) => { setName(target.value); };
  // const handleEmail = ({ target }) => { setEmail(target.value); };
  // const handlePassword = ({ target }) => { setPassword(target.value); };

  const submitForm = async () => {
    setErrorMessage('');

    try {
      const user = await registration({ name, email, password, role: 'customer' });
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/customer/products');
    } catch (err) {
      const response = err?.response?.data?.message || err?.message;
      setErrorMessage(response);
    }
  };

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const isValidEmail = re.test(email);
    if (name.length >= TWELVE && isValidEmail && password.length >= SIX) {
      setDisable(false);
    } else { setDisable(true); }
  }, [email, name, password]);

  return (
    <div className="w-[300px]">
      <form autoComplete="off" autoCapitalize="off">
        <div className="mb-3 register__name">
          <input
            id="name"
            data-testid="common_register__input-name"
            className="form__input h-[50px] justify-start"
            //   ${errors.name && 'form__error'}` }
            placeholder="Name"
            type="text"
            onChange={ (e) => setName(e.target.value) }
            required
          />
        </div>
        <div className="mb-3 register__input-icon">
          <input
            id="email"
            data-testid="common_register__input-email"
            className="form__input h-[50px] justify-start"
            //   ${errors.email && 'form__error'}` }
            placeholder="Email"
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </div>
        <div className="mb-3 register__input-icon">
          <input
            id="password"
            data-testid="common_register__input-password"
            className="form__input h-[50px] justify-start"
            //   ${errors.password && 'form__error'}` }
            placeholder="Password"
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </div>
        {/* <div
          className="mb-3 form__error-msg"
        >
          {errors.name?.message || errors.email?.message || errors.password?.message}
        </div> */}
        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            data-testid="common_register__element-invalid_register"
          >
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <button
            className="form__button w-full h-[50px] flex items-center justify-center"
            type="button"
            data-testid="common_register__button-register"
            disabled={ disable }
            onClick={ () => submitForm() }
          >
            Register
          </button>
        </div>
        <div className="flex items-center justify-center my-7">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
