import type { Product } from '../types/Product';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CatalogSearchState {
  categories: string[];
  sort: SortOption;
}

export const SORT_OPTIONS: Array<{ label: string; value: SortOption }> = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating-desc' },
];

const CATEGORY_LABELS: Record<string, string> = {
  electronics: 'Electronics',
  jewelery: 'Jewelery',
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatCategoryLabel(category: string) {
  return (CATEGORY_LABELS[category] || category).toUpperCase();
}

export function toCategoryPillLabel(category: string) {
  return CATEGORY_LABELS[category] || category;
}

export function toCategoryParam(category: string) {
  return category.trim().toLowerCase();
}

function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function parseCatalogSearch(search: string): CatalogSearchState {
  const params = new URLSearchParams(search);
  const categories =
    params
      .get('categories')
      ?.split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean) || [];

  const sortParam = params.get('sort');
  const sort = isSortOption(sortParam) ? sortParam : 'default';

  return { categories, sort };
}

export function buildCatalogSearch(state: CatalogSearchState) {
  const params = new URLSearchParams();

  if (state.categories.length > 0) {
    params.set('categories', state.categories.join(','));
  }

  if (state.sort !== 'default') {
    params.set('sort', state.sort);
  }

  const nextSearch = params.toString();
  return nextSearch ? `?${nextSearch}` : '';
}

export function sortProducts(products: Product[], sort: SortOption) {
  const nextProducts = [...products];

  switch (sort) {
    case 'price-asc':
      return nextProducts.sort((first, second) => first.price - second.price);
    case 'price-desc':
      return nextProducts.sort((first, second) => second.price - first.price);
    case 'rating-desc':
      return nextProducts.sort(
        (first, second) => second.rating.rate - first.rating.rate,
      );
    default:
      return nextProducts;
  }
}
