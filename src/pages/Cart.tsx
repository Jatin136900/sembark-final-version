import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCategoryLabel, formatCurrency } from '../utils/shop';

function CartPage() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page page-enter">
        <div className="cart-empty">
          <p className="eyebrow">Your Cart</p>
          <h1>Your cart is empty</h1>
          <p className="cart-empty__copy">
            Add a product from the catalog to see it here.
          </p>
          <Link className="primary-button" to="/">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page page-enter">
      <div className="cart-page__header">
        <div>
          <p className="eyebrow">Your Cart</p>
          <h1>Cart Overview</h1>
        </div>

        <Link className="text-link" to="/">
          Continue Shopping
        </Link>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item__media">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item__content">
                <p className="cart-item__category">
                  {formatCategoryLabel(item.category)}
                </p>
                <h2>{item.title}</h2>
                <p className="cart-item__meta">
                  <span>Quantity: {item.quantity}</span>
                  <span>Unit Price: {formatCurrency(item.price)}</span>
                </p>
              </div>

              <div className="cart-item__actions">
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary__row">
            <span>Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="cart-summary__row">
            <span>Subtotal</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>

          <p className="cart-summary__note">
            Cart data is stored in the browser session so a refresh keeps your
            selections.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
