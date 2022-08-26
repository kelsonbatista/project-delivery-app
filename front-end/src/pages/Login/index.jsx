// import { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import logo from '../../images/logo4.png';

export default function Login() {
  return (
    <main>
      <section className="home">
        <div className="home__left">
          &nbsp;
        </div>
        <div className="home__right">
          <section className="home__logo body__title1">
            <img src={ logo } alt="Logo" className="home__logo-image" />
            <h1 className="home__logo-title">aiqsede!</h1>
          </section>
          {/* <section className="home__logo-title body__title1">
            <h1 className="mb-10">Login</h1>
          </section> */}
          <section className="home__login">
            <LoginForm />
          </section>
        </div>
      </section>
    </main>
  );
}
