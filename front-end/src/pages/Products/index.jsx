import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
// import { getStorage } from '../../helpers/localStorage';
import Header from '../../components/Header';
import CartLayer from '../../components/CartLayer';
import { getProducts } from '../../services/product.services';
import { getStorage } from '../../helpers/localStorage';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleProducts = async () => {
    const productsList = await getProducts();
    setProducts(productsList);
    return productsList;
  };

  const cartSum = () => {
    const orders = getStorage('carrinho') || [];
    const result = orders.map((order) => order.price * order.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    setTotalValue(result.toFixed(2));
  };
  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <main>
      <Header />
      <div className="product pt-[120px] pb-[100px]">
        {
          (products.length > 0) && products.map((p, index) => (
            <ProductCard key={ index } data={ p } updateValue={ cartSum } />
          ))
        }
      </div>
      <CartLayer value={ totalValue } />
    </main>
  );
}
