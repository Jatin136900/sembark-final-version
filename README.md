# Sembark Storefront

Sembark Storefront is a responsive eCommerce web application built with React, TypeScript, and Vite. It delivers a complete browse-to-cart experience with category filtering, sorting, product detail pages, session-persisted cart state, and a resilient catalog layer that can fall back to local data if the external product API is unavailable.

This project is designed as a production-oriented storefront foundation: the UI is componentized, routing is explicit, state is centralized where needed, and key user journeys are covered with end-to-end tests.

## Project Overview

- **What the project is:** A single-page storefront application for browsing products, viewing product details, managing cart items, and reviewing an order summary before checkout.
- **What problem it solves:** Many catalog demos stop at static product grids. This project models the real flow shoppers expect: discover products, filter inventory, inspect details, choose quantities, and carry cart state across pages and refreshes.
- **Who the target users are:** Online shoppers browsing consumer goods on desktop or mobile, and development teams or reviewers looking for a solid front-end commerce architecture that can be extended into a full transactional platform.

## How the eCommerce System Works

### 1. Product Browsing

When the application loads, the home page fetches the product catalog and available categories through the service layer in `src/services/api.ts`. The catalog is normalized before use so prices, category labels, IDs, and ratings remain predictable across the UI.

Users browse products through:

- A product grid on the home page
- Category pills for multi-select filtering
- A sort dropdown for price and rating-based ordering
- Deep links to individual product pages

Catalog filters and sorting are stored in the URL query string, which means the current view can be refreshed, bookmarked, or shared without losing state.

### 2. Add to Cart Functionality

From the product detail page, users can:

- View the product image, category, rating, description, and price
- Adjust quantity with a stepper control
- Add one or multiple units to the cart

Cart state is managed globally with a React Context provider, so updates are reflected immediately across the header badge, sticky footer summary, and cart page.

### 3. Checkout Process

The current implementation provides a **pre-checkout cart review flow** rather than a payment-enabled checkout. On the cart page, users can:

- Review all selected items
- Increase or decrease quantities
- Remove products from the cart
- See total item count and subtotal

This acts as the checkout preparation layer and is the point where a payment gateway, shipping form, tax calculation, and order submission service would be integrated in a full production build.

### 4. Order Placement Flow

At the moment, the flow ends at cart review and summary. A permanent order is **not** yet submitted to a backend or payment processor. The current user journey is:

1. Browse the catalog
2. Open a product detail page
3. Select quantity and add items to the cart
4. Review the cart summary
5. Continue shopping or prepare for a future checkout integration

This keeps the project honest to its current scope while still providing a realistic storefront workflow.

### 5. Data Management

The application is currently frontend-first and uses an external product API instead of a custom backend.

- **Frontend:** React components render the UI, manage route transitions, and handle cart interactions.
- **Data source:** Product data is fetched from Fake Store API.
- **Fallback resilience:** If the API fails, the app uses a local fallback catalog from `src/data/fallbackCatalog.ts`.
- **State management:** Cart state is stored in a shared Context provider.
- **Persistence:** Cart contents are saved in `sessionStorage`, so refreshing the page does not clear the active shopping session.
- **Routing state:** Filter and sort selections are encoded in the URL rather than hidden in component-only state.

## Features

- API-driven product catalog
- Local fallback catalog for API failure scenarios
- Category-based product filtering
- URL-persisted filter and sort state
- Product detail pages with quantity selection
- Add to cart, remove from cart, and quantity updates
- Sticky cart summary footer available across routes
- Cart badge in the header for live item count visibility
- Session-based cart persistence with `sessionStorage`
- Responsive layout optimized for desktop, tablet, and mobile
- Dedicated 404 page for unknown routes
- End-to-end Playwright tests for core storefront journeys

## Tech Stack

| Layer | Technologies | Purpose |
| --- | --- | --- |
| Frontend | React 19, TypeScript | Component-based UI and type-safe development |
| Routing | React Router DOM 7 | Client-side navigation between catalog, product, cart, and 404 pages |
| State Management | React Context API, custom `useCart()` hook | Global cart state and cart actions |
| Styling | CSS3 | Custom responsive UI styling without a component framework |
| Build Tooling | Vite 8, npm | Fast local development, bundling, and preview builds |
| Testing | Playwright, ESLint | End-to-end validation and code quality checks |
| Data Layer | Fake Store API, local fallback dataset | Catalog retrieval and resilience when the API is unavailable |
| Deployment Support | Vercel config | SPA rewrite support for direct route access in production |

## Project Structure

```text
.
|-- public/                  # Static assets such as icons and images
|-- src/
|   |-- assets/              # Bundled visual assets used by Vite
|   |-- components/          # Shared UI building blocks like header, footer, and product card
|   |-- context/             # Cart context, provider, and custom hook
|   |-- data/                # Local fallback catalog data
|   |-- pages/               # Route-level screens: Home, Product Detail, Cart, Not Found
|   |-- services/            # API access and data normalization logic
|   |-- types/               # Shared TypeScript interfaces for products and cart items
|   |-- utils/               # Helpers for sorting, formatting, and URL state handling
|   |-- App.tsx              # Route definitions
|   |-- index.css            # Global styles
|   `-- main.tsx             # Application entry point
|-- tests/                   # Playwright end-to-end tests
|-- vercel.json              # SPA routing configuration for deployment
|-- vite.config.ts           # Vite configuration
`-- package.json             # Scripts and dependencies
```

## Installation & Setup

### Prerequisites

- Node.js
- npm

### Run Locally

```bash
npm install
npm run dev
```

After the development server starts, open the local URL shown in the terminal, typically `http://localhost:5173`.

### Available Scripts

```bash
npm run build      # Create a production build
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm run test:e2e   # Run Playwright end-to-end tests
```

## Usage

1. Open the home page to load the storefront catalog.
2. Use the category pills to narrow the visible product set.
3. Change sort order to compare products by price or rating.
4. Open any product card to view detailed information.
5. Adjust quantity and add the product to the cart.
6. Open the cart to review items, update counts, or remove products.
7. Continue shopping or use the cart summary as the final step before a future checkout integration.

## Screenshots / UI Description

Screenshots are not currently included in the repository, but the interface is organized into the following primary sections:

- **Homepage:** A clean catalog landing page with a headline, category filter pills, a sort control, and a responsive product grid.
- **Product Card:** Each card highlights the product image, category, title, price, and rating, and links directly to the detail page.
- **Product Detail Page:** A focused product view with larger imagery, descriptive copy, rating stars, price display, quantity controls, and the primary add-to-cart action.
- **Cart Page:** A structured cart overview showing line items, quantity steppers, remove actions, and an order summary panel.
- **Global Header:** Minimal top navigation with a home shortcut and live cart badge.
- **Sticky Footer:** Persistent order summary showing total items and subtotal, with a contextual action to view the cart or continue shopping.
- **404 Page:** A dedicated not-found screen for invalid routes, preserving the feel of a complete storefront application.

## Future Improvements

- Add real user authentication and account profiles
- Integrate a full checkout flow with shipping, billing, and payment processing
- Persist orders to a backend service and database
- Add product search, wishlist, and saved-for-later capabilities
- Support inventory tracking, stock messaging, and backend-driven pricing
- Introduce order history, invoice generation, and customer dashboards
- Add admin tools for catalog management and merchandising
- Expand analytics, accessibility auditing, and performance optimization

## Why This Project

Sembark Storefront was built to demonstrate how a modern eCommerce front end should behave beyond static product rendering. It focuses on the parts that matter in real shopping interfaces: discoverability, route-aware state, cart continuity, responsive layout, and resilience when external services fail.

For developers, it provides a clean foundation for extending into a full-stack commerce platform. For users, it delivers a fast, intuitive shopping journey that already feels close to a real online store, even before payment and order services are added.
