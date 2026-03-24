import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import { useCart } from '../context/cart-context';
import { fetchProductById } from '../services/api';
import type { Product } from '../types/Product';
import { formatCategoryLabel, formatCurrency } from '../utils/shop';

interface ProductDetailContentProps {
  productId: number;
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="back-link__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}

function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;

    fetchProductById(productId)
      .then((selectedProduct) => {
        if (!active) {
          return;
        }

        if (!selectedProduct) {
          setError('Product not found.');
          setProduct(null);
          return;
        }

        setProduct(selectedProduct);
      })
      .catch(() => {
        if (active) {
          setError('Unable to load this product right now.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [productId]);

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  if (loading) {
    return <p className="status-card page-enter">Loading product details...</p>;
  }

  if (error || !product) {
    return <p className="status-card page-enter">{error || 'Product not found.'}</p>;
  }

  return (
    <section className="product-detail page-enter">
      <button className="back-link" type="button" onClick={handleBack}>
        <BackIcon />
        Back
      </button>

      <div className="product-detail__panel">
        <div className="product-detail__media">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail__content">
          <p className="product-detail__category">
            {formatCategoryLabel(product.category)}
          </p>

          <h1 className="product-detail__title">{product.title}</h1>

          <RatingStars
            rating={product.rating.rate}
            reviews={product.rating.count}
          />

          <p className="product-detail__description">{product.description}</p>

          <p className="product-detail__price">
            {formatCurrency(product.price)}
          </p>

          <div className="product-detail__purchase">
            <div className="quantity-stepper" aria-label="Select quantity">
              <button
                className="quantity-stepper__button"
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                -
              </button>

              <output className="quantity-stepper__value" aria-live="polite">
                {quantity}
              </output>

              <button
                className="quantity-stepper__button"
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className="primary-button primary-button--wide"
              type="button"
              onClick={() => addToCart(product, quantity)}
            >
              Add {quantity} to My Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);

  return <ProductDetailContent key={id} productId={productId} />;
}

export default ProductDetail;
