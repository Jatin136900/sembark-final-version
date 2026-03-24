import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import { formatCategoryLabel, formatCurrency } from '../utils/shop';

interface ProductCardProps {
  product: Product;
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="product-card__star"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 3.2 2.7 5.4 6 0.9-4.4 4.2 1 5.9L12 16.8 6.7 19.6l1-5.9-4.4-4.2 6-0.9Z" />
    </svg>
  );
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      className="product-card"
      to={`/product/${product.id}/details`}
      aria-label={`View ${product.title}`}
    >
      <div className="product-card__image-shell">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="product-card__content">
        <div className="product-card__body">
          <p className="product-card__category">
            {formatCategoryLabel(product.category)}
          </p>

          <h3 className="product-card__title">{product.title}</h3>
        </div>

        <div className="product-card__meta">
          <span className="product-card__price">
            {formatCurrency(product.price)}
          </span>

          <span className="product-card__rating">
            <StarIcon />
            {product.rating.rate.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
