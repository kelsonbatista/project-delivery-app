import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
// import userSchema from '../../helpers/schemas/user.schema';
import { registrationAdmin } from '../../services/register.services';
import { getStorage } from '../../helpers/localStorage';
import { SIX, TWELVE } from '../../helpers/constants';
// import Button from '../Button';

function UserForm(props) {
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [role, setTipo] = useState('');
  const [disable, setDisable] = useState(true);
  // const [errors, setErrors] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const roleAdmin = getStorage('user');
  const { dispatchRegisterUser } = props;
  const usersRole = [
    { id: 'administrator', name: 'administrator' },
    { id: 'seller', name: 'seller' },
    { id: 'customer', name: 'customer' },
  ];

  const onSubmit = async () => {
    setErrorMessage('');

    try {
      const user = { name, email, password, role };
      await registrationAdmin(user, roleAdmin);
      dispatchRegisterUser(true);
    } catch (err) {
      const response = err?.response?.data?.message || err?.message;
      setErrorMessage(response);
    }
    // reset();
    setNome('');
    setEmail('');
    setSenha('');
    setTipo('');
  };

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const isValidEmail = re.test(email);
    if (name.length >= TWELVE && isValidEmail && password.length >= SIX && role) {
      setDisable(false);
    } else { setDisable(true); }
  }, [name, email, password, role]);

  return (
    <div>
      <div className="body__title3 my-4">Cadastrar novo usuário</div>
      <form
        // onSubmit={ handleSubmit(onSubmit) }
        autoComplete="off"
        autoCapitalize="off"
        className="admin__form"
      >
        <div className="admin__form-group">
          <label className="mr-3" htmlFor="username">
            Nome
            <input
              data-testid="admin_manage__input-name"
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              className="form__input w-[87vw] md:w-[100%]"
              value={ name }
              onChange={ (e) => setNome(e.target.value) }
              required
            />
          </label>
          <label className="mr-3" htmlFor="email">
            Email
            <input
              data-testid="admin_manage__input-email"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              className="form__input w-[87vw] md:w-[100%]"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
          </label>
          <label className="mr-3" htmlFor="password">
            Senha
            <input
              data-testid="admin_manage__input-password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form__input w-[87vw] md:w-[100%]"
              value={ password }
              onChange={ (e) => setSenha(e.target.value) }
              required
            />
          </label>
          <label className="mr-3" htmlFor="role">
            Tipo
            <select
              id="role"
              name="role"
              type="text"
              placeholder="Vendedor"
              className="form__input w-[87vw] md:w-[100%]"
              data-testid="admin_manage__select-role"
              value={ role }
              onChange={ (e) => setTipo(e.target.value) }
              required
            >
              <option value="">Selecione</option>
              {usersRole.map((option) => (
                <option key={ option.id } value={ option.id }>{option.name}</option>
              ))}
            </select>
          </label>
          <div>
            <div>&nbsp;</div>
            <button
              type="button" // vazio = submit / button = button
              className="admin__button"
              data-testid="admin_manage__button-register"
              disabled={ disable }
              onClick={ () => onSubmit() }
            >
              Cadastrar
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-3 w-[100%]">
          {errorMessage && (
            <div
              className="alert alert-danger w-[100%] text-center"
              data-testid="admin_manage__element-invalid-register"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  dispatchRegisterUser: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterUser: (users) => dispatch(setUser(users)),
});

export default connect(null, mapDispatchToProps)(UserForm);
