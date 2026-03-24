import fallbackCatalog from '../data/fallbackCatalog';
import type { Product } from '../types/Product';

const API_BASE_URL = 'https://fakestoreapi.com';
const CATEGORY_ORDER = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

let catalogPromise: Promise<Product[]> | null = null;

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Unable to load data from Fake Store API.');
  }

  return response.json() as Promise<T>;
}

function toFiniteNumber(value: unknown, fallback = 0) {
  const nextValue = Number(value);

  return Number.isFinite(nextValue) ? nextValue : fallback;
}

function normalizeProduct(product: Product): Product {
  return {
    id: toFiniteNumber(product.id),
    title: String(product.title || '').trim(),
    price: toFiniteNumber(product.price),
    description: String(product.description || '').trim(),
    category: String(product.category || '').trim().toLowerCase(),
    image: String(product.image || '').trim(),
    rating: {
      rate: toFiniteNumber(product.rating?.rate),
      count: toFiniteNumber(product.rating?.count),
    },
  };
}

function cloneProducts(products: Product[]) {
  return products.map((product) => ({
    ...product,
    rating: { ...product.rating },
  }));
}

async function loadCatalog(): Promise<Product[]> {
  try {
    const products = await request<Product[]>('/products');
    return products.map(normalizeProduct);
  } catch {
    return cloneProducts(fallbackCatalog);
  }
}

export function fetchProducts(): Promise<Product[]> {
  if (!catalogPromise) {
    catalogPromise = loadCatalog();
  }

  return catalogPromise.then(cloneProducts);
}

export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts();
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  return categories.sort((first, second) => {
    const firstIndex = CATEGORY_ORDER.indexOf(first);
    const secondIndex = CATEGORY_ORDER.indexOf(second);

    return firstIndex - secondIndex;
  });
}

export async function fetchProductsByCategories(
  categories: string[],
): Promise<Product[]> {
  const products = await fetchProducts();

  if (categories.length === 0) {
    return products;
  }

  const selectedCategories = new Set(
    categories.map((category) => category.trim().toLowerCase()),
  );

  return products.filter((product) =>
    selectedCategories.has(product.category),
  );
}

export async function fetchProductById(productId: number) {
  const products = await fetchProducts();

  return products.find((product) => product.id === productId) || null;
}
