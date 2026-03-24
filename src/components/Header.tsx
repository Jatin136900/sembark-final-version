import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context';

function StoreIcon() {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5h16" />
      <path d="M5 10.5V19h14v-8.5" />
      <path d="M3.5 7 5 4.5h14L20.5 7c0 2-1.3 3.5-3.3 3.5-1.4 0-2.5-.7-3.2-1.9-.7 1.2-1.8 1.9-3.2 1.9S8.3 9.8 7.6 8.6c-.7 1.2-1.8 1.9-3.1 1.9C3 10.5 3.5 8.9 3.5 7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
      <path d="M4 5h2l2.1 9.2h9.2L20 8H7.2" />
    </svg>
  );
}

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__home" to="/" aria-label="Go to home page">
          <StoreIcon />
        </Link>

        <Link className="topbar__cart" to="/cart">
          <CartIcon />
          <span>Cart</span>
          {totalItems > 0 ? (
            <span className="topbar__badge">{totalItems}</span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export default Header;
