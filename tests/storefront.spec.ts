import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'A durable backpack for everyday travel and work.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim fit tee for daily wear.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
];

async function mockStoreApi(page: Page) {
  await page.route('https://fakestoreapi.com/**', async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname === '/products/categories') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          'electronics',
          'jewelery',
          "men's clothing",
          "women's clothing",
        ]),
      });
      return;
    }

    if (url.pathname.startsWith('/products/category/')) {
      const category = decodeURIComponent(url.pathname.split('/').pop() || '');
      const filteredProducts = mockProducts.filter(
        (product) => product.category === category,
      );

      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(filteredProducts),
      });
      return;
    }

    if (url.pathname === '/products') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockProducts),
      });
      return;
    }

    await route.fallback();
  });
}

test('catalog, detail page, and cart flow work together', async ({ page }) => {
  await mockStoreApi(page);

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Discover Products' }),
  ).toBeVisible();

  await expect(page.getByText('Loading products...')).not.toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(2);

  const firstProduct = page.locator('.product-card').first();
  await expect(firstProduct).toBeVisible();
  const productDetailPath = await firstProduct.getAttribute('href');
  await page.goto(productDetailPath || '/product/1/details');

  await expect(
    page.getByRole('button', { name: 'Add 1 to My Cart' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Add 1 to My Cart' }).click();

  await expect(page.locator('.topbar__badge')).toHaveText('1');
  await page.getByRole('link', { name: /view cart/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Cart Overview' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
});

test('catalog stays within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockStoreApi(page);

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Discover Products' }),
  ).toBeVisible();
  await expect(page.getByText('Loading products...')).not.toBeVisible();

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const grid = document.querySelector('.product-grid');

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      productGridColumns: grid ? getComputedStyle(grid).gridTemplateColumns : '',
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
  expect(layout.productGridColumns.split(' ').length).toBe(2);
  await expect(page.getByRole('link', { name: /view cart/i })).toBeVisible();
});

test('product detail quantity stepper adds multiple items to the cart', async ({ page }) => {
  await mockStoreApi(page);
  await page.goto('/product/1/details');

  await expect(
    page.getByRole('button', { name: 'Add 1 to My Cart' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();

  await expect(page.locator('.quantity-stepper__value')).toHaveText('3');
  await page.getByRole('button', { name: 'Add 3 to My Cart' }).click();

  await expect(page.locator('.topbar__badge')).toHaveText('3');
});

test('catalog toolbar does not stretch at tablet widths', async ({ page }) => {
  await page.setViewportSize({ width: 694, height: 517 });
  await mockStoreApi(page);

  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Discover Products' }),
  ).toBeVisible();
  await expect(page.getByText('Loading products...')).not.toBeVisible();

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const categoryPills = document.querySelector('.category-pills');

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      categoryPillsHeight: categoryPills?.getBoundingClientRect().height ?? 0,
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
  expect(layout.categoryPillsHeight).toBeLessThan(160);
});

test('unknown routes show the 404 page', async ({ page }) => {
  await page.goto('/missing-page');

  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to Home' })).toBeVisible();
});
