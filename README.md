MONO DESK — Minimalist Workspace Hardware Storefront

A modern, dark-themed e-commerce web application built for MONO DESK, showcasing minimalist workspace hardware including mechanical keyboards, monitor stands, braided cables & hubs, and desk mats.

Project Description

MONO DESK is a single-page e-commerce storefront built with React, TypeScript, and Vite. Visitors can explore featured workspace hardware, search and filter the full catalog by category or price range, sort items by price, save favorites to a persistent wishlist, manage cart quantities, and complete a validated checkout flow with live order confirmation.

Features

Home & Persistent Layout Shell:

Animated top announcement banner and sticky navigation header with live Cart and Wishlist item counters.

Responsive hero section, category overview cards, and featured hardware highlights.

Interactive Products Catalog (/products):

Responsive product grid displaying product image, badge, category, name, price, and summary.

Real-time search by product name.

Category filter pills (All, Keyboards, Stands, Cables & Hubs, Desk Mats).

Price range filtering (Under $50, $50 – $100, $100 – $150, $150+) and price sorting (Low to High / High to Low).

Empty-state view with one-click filter reset when no products match.

Persistent Wishlist (/wishlist):

Add or remove products from anywhere in the store with state persisted in localStorage.

View saved items and move them directly into the shopping cart.

Shopping Cart (/cart):

Increment or decrement item quantities, remove individual items, or clear the entire cart.

Automatic calculation of subtotal, shipping (free on orders $500+, otherwise $25), and order total.

Validated Checkout (/checkout):

Full order review alongside a customer delivery form validated with Zod.

Field-level inline error messages blocking invalid submissions (enforcing letter-only names/cities/countries, valid email/phone formats, and street addresses).

Empty-cart protection and post-submission order confirmation receipt.

Technologies Used:

React 19 — Component-based UI architecture and Context API state management

TypeScript — Static typing across product models, context state, and form schemas

Vite — Fast development server with Hot Module Replacement (HMR) and production bundling

React Router (react-router-dom) — Client-side routing across Home, Products, Wishlist, Cart, and Checkout views

Zod (zod) — Schema-based form validation and type inference for checkout inputs

CSS3 (Modular Page Stylesheets) — Responsive CSS Grid/Flexbox layouts and custom dark-mode styling

Web Storage API (localStorage) — Client-side persistence for cart items and wishlist selections

Setup & Installation Instructions:

Prerequisites

Node.js (v18 or higher recommended)

npm (comes bundled with Node.js)

1. Clone the Repository

git clone https://github.com/<your-username>/ecommerce-react-homework.git
cd ecommerce-react-homework


2. Install Dependencies

npm install


3. Run the Development Server

npm run dev


Open the local URL shown in your terminal (typically http://localhost:5173) to view the application in your browser.
