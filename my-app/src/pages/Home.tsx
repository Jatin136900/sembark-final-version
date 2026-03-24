import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchCategories, fetchProductsByCategories } from '../services/api';
import type { Product } from '../types/Product';
import {
  buildCatalogSearch,
  parseCatalogSearch,
  sortProducts,
  type SortOption,
  SORT_OPTIONS,
  toCategoryParam,
  toCategoryPillLabel,
} from '../utils/shop';

function SortIcon() {
  return (
    <svg
      aria-hidden="true"
      className="sort-control__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4v14" />
      <path d="m5 7 3-3 3 3" />
      <path d="M16 20V6" />
      <path d="m13 17 3 3 3-3" />
    </svg>
  );
}

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const catalogState = useMemo(
    () => parseCatalogSearch(location.search),
    [location.search],
  );
  const sortedProducts = useMemo(
    () => sortProducts(products, catalogState.sort),
    [products, catalogState.sort],
  );

  useEffect(() => {
    let active = true;

    fetchCategories()
      .then((data) => {
        if (active) {
          setCategories(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load categories right now.');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    fetchProductsByCategories(catalogState.categories)
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load products right now.');
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
  }, [catalogState.categories]);

  function updateCatalog(nextCategories: string[], nextSort = catalogState.sort) {
    navigate(
      {
        pathname: '/',
        search: buildCatalogSearch({
          categories: nextCategories,
          sort: nextSort,
        }),
      },
      { replace: false },
    );
  }

  function handleCategoryClick(category: string) {
    const categoryParam = toCategoryParam(category);
    const nextCategories = catalogState.categories.includes(categoryParam)
      ? catalogState.categories.filter((item) => item !== categoryParam)
      : [...catalogState.categories, categoryParam];

    updateCatalog(nextCategories);
  }

  function handleSortChange(sort: SortOption) {
    updateCatalog(catalogState.categories, sort);
  }

  return (
    <section className="catalog-page page-enter">
      <div className="catalog-page__intro">
        <h1>Discover Products</h1>
        <p className="catalog-page__subtitle">
          Explore our curated collection
        </p>
      </div>

      <div className="catalog-toolbar">
        <div className="category-pills" role="group" aria-label="Product categories">
          <button
            type="button"
            className={
              catalogState.categories.length === 0
                ? 'category-pill is-active'
                : 'category-pill'
            }
            onClick={() => updateCatalog([])}
          >
            All
          </button>

          {categories.map((category) => {
            const categoryParam = toCategoryParam(category);
            const isActive = catalogState.categories.includes(categoryParam);

            return (
              <button
                key={category}
                type="button"
                className={isActive ? 'category-pill is-active' : 'category-pill'}
                onClick={() => handleCategoryClick(category)}
              >
                {toCategoryPillLabel(category)}
              </button>
            );
          })}
        </div>

        <label className="sort-control">
          <SortIcon />
          <select
            value={catalogState.sort}
            onChange={(event) =>
              handleSortChange(event.target.value as SortOption)
            }
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="status-card">{error}</p> : null}
      {loading ? <p className="status-card">Loading products...</p> : null}

      {!loading && !error ? (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Home;
