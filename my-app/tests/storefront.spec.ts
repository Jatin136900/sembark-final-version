import { expect, test } from '@playwright/test';

test('catalog, detail page, and cart flow work together', async ({ page }) => {
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
    page.getByRole('button', { name: 'Add to My Cart' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Add to My Cart' }).click();

  await expect(page.locator('.topbar__badge')).toHaveText('1');
  await page.getByRole('link', { name: /view cart/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Cart Overview' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
});
