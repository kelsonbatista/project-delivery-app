import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FIVE, ONE_THOUSAND } from '../../helpers/constants';

export default function Payment() {
  const navigate = useNavigate();
  const [count, setCount] = useState(FIVE);

  const countdown = setInterval(() => {
    setCount(count - 1);
    if (count === 1) {
      navigate('/customer/orders');
      clearInterval(countdown);
    }
  }, ONE_THOUSAND);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="body__screen">
        <p className="body__title1">Compra realizada com sucesso!</p>
        <p className="mt-3 font-extrabold text-center">{`Redirecionando... ${count}`}</p>
      </div>
    </div>
  );
}
