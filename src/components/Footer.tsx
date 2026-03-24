import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/shop';

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 11H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function Footer() {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  const footerAction =
    location.pathname === '/cart' ? (
      <Link className="footer-bar__button" to="/">
        Continue Shopping
      </Link>
    ) : (
      <Link className="footer-bar__button" to="/cart">
        View Cart
      </Link>
    );

  return (
    <footer className="footer-bar">
      <div className="footer-bar__inner">
        <div className="footer-bar__summary">
          <span className="footer-bar__icon-shell">
            <BagIcon />
          </span>

          <span>{totalItems} item{totalItems === 1 ? '' : 's'}</span>

          <span className="footer-bar__divider" aria-hidden="true" />

          <strong>{formatCurrency(totalPrice)}</strong>
        </div>

        {footerAction}
      </div>
    </footer>
  );
}

export default Footer;
