import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import Nav from 'react-bootstrap/Nav';
import { getStorage, removeStorage } from '../../helpers/localStorage';
import logo from '../../images/logo4.png';

function Header() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const dataUser = getStorage('user');
    setUser(dataUser);
  }, []);

  const logOut = () => {
    removeStorage('user');
    removeStorage('button');
  };

  return (
    <header className="header">
      <div className="header__brand">
        <img src={ logo } alt="logo" className="header__logo" />
        <h1 className="header__title">aiqsede!</h1>
      </div>
      <Nav className="header__nav" defaultActiveKey="/customer/products">
        <Nav.Item>
          <Nav.Link
            data-testid="customer_products__element-navbar-link-products"
            href="/customer/products"
            className="header__link"
          >
            PRODUTOS
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            data-testid="customer_products__element-navbar-link-orders"
            className="header__link"
            href={ user ? `/${user.role}/orders` : '/customer/orders' }
          >
            MEUS PEDIDOS

          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="header__dropdown">
        <HiMenu
          className="dropdown-toggle header__menu-hamburguer"
          href="/profile"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <a
          className="dropdown-toggle header__menu-dropdown"
          href="/profile"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          { user.name }
        </a>
        <ul className="dropdown-menu mt-3">
          <li>
            <a
              data-testid="customer_products__element-navbar-user-full-name"
              className="dropdown-item"
              href="/profile"
            >
              Minha Conta
            </a>
          </li>
          <li className="header__item">
            <a
              data-testid="customer_products__element-navbar-link-orders"
              className="dropdown-item"
              href={ user ? `/${user.role}/orders` : '/customer/orders' }
            >
              Meus Pedidos
            </a>
          </li>
          <li className="header__item">
            <a
              data-testid="customer_products__element-navbar-link-products"
              className="dropdown-item"
              href="/customer/products"
            >
              Produtos
            </a>
          </li>
          <li>
            <a
              data-testid="customer_products__element-navbar-link-logout"
              className="dropdown-item"
              href="/login"
              onClick={ logOut }
            >
              Sair
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
