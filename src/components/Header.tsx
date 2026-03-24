import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context';

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__home" to="/" aria-label="Go to home page">
          <img className="topbar__home-image" src="/img.png" alt="" />
        </Link>

        <Link className="topbar__cart" to="/cart" aria-label="Open cart">
          <img className="topbar__cart-image" src="/img2.png" alt="" />
          {totalItems > 0 ? (
            <span className="topbar__badge">{totalItems}</span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export default Header;
