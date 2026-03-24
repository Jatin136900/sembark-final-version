# Sembark Storefront

A small e-commerce storefront built with React, React Router, Context API, and Fake Store API.

## Features

- Home page with API-driven product grid
- Category filtering with multiple selections
- URL-persisted filters and sorting without `useSearchParams`
- Product detail page at `/product/:id/details`
- Cart page with add and remove support
- Sticky footer cart summary
- Session-based cart persistence
- Mobile-responsive layout styled with plain CSS

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Context API

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## E2E Tests

```bash
npm run test:e2e
```

## Notes and Assumptions

- Product data and categories come from `https://fakestoreapi.com/`.
- Category filters call the API again instead of filtering an already loaded list in memory.
- Sorting is applied after the filtered API response is loaded because Fake Store API does not provide the required UI sorting options directly.
- The cart is stored in `sessionStorage` so refreshes keep the session cart state.
