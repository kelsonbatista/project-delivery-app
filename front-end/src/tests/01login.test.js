import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from './helpers';

const userMock = {
  email: 'maria@email.com',
  password: '123456',
}

describe('Testa o componente <Login.jsx />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste Login', () => {

    const inputEmail = screen.getByTestId('common_login__input-email')
    userEvent.type(inputEmail, userMock.email);
    
    const inputPassword = screen.getByTestId('common_login__input-password');
    userEvent.type(inputPassword, userMock.password);

    const buttonLogin = screen.getByTestId('common_login__button-login');
    
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue(userMock.email);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue(userMock.password);
    
    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);
    
  }) 
})