import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import { ProductCard } from '../Products/ProductCard';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FilterByColor.module.css';

export function FilterByColor({ color }) {
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products) {
    return <strong>Loading products...</strong>;
  }

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <div className={styles['search-bar']}>
        <form>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="Search..."
            onChange={handleSearchTerm}
          />
          <FontAwesomeIcon
            icon={solid('magnifying-glass')}
            className={styles['search-icon']}
          />{' '}
        </form>
      </div>
      <div className={styles['products-list']}>
        {products
          .filter((product) => {
            if (searchTerm === '') {
              return product.color === color;
            } else if (
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return product.color === color;
            }
          })
          .map((product) => (
            <ProductCard
              cart={cart}
              setCart={setCart}
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </>
  );
}
