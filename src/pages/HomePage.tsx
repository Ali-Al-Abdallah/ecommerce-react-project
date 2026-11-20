import { Link } from "react-router-dom";
import "./HomePage.css";

const CATEGORIES = [
  {
    id: "keyboards",
    title: "Mechanical Keyboards",
    description: "Low-profile and tactile boards built for long typing sessions.",
  },
  {
    id: "stands",
    title: "Monitor & Laptop Stands",
    description: "Machined aluminum risers for cleaner ergonomics and desk space.",
  },
  {
    id: "cables",
    title: "Cables & Hubs",
    description: "Braided USB-C leads and compact docks to tame desk clutter.",
  },
];

const FEATURED_PRODUCTS = [
  {
    id: "m1-keyboard",
    name: "MONO M1 Wireless Keyboard",
    price: "$165",
    summary: "Compact 75% aluminum frame with quiet linear switches.",
  },
  {
    id: "arc-riser",
    name: "Arc Aluminum Laptop Riser",
    price: "$89",
    summary: "Angled desktop stand with pass-through cable routing.",
  },
  {
    id: "dock-mini",
    name: "Hub 04 USB-C Desk Dock",
    price: "$120",
    summary: "Single-cable expansion for displays, power, and peripherals.",
  },
];

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Precision Hardware for Calm Workspaces</h1>
        <p>
          Minimalist desk stands, tactile input tools, and clean everyday
          essentials designed to keep your setup focused and uncluttered.
        </p>

        <div className="hero-actions">
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
          <a href="#categories" className="btn-secondary">
            Explore Categories
          </a>
        </div>
      </section>

      <section id="categories" className="page-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="section-link">
            View all
          </Link>
        </div>

        <div className="section-grid">
          {CATEGORIES.map((category) => (
            <Link key={category.id} to="/products" className="dark-card">
              <h3>{category.title}</h3>
              <p className="card-text">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="page-section">
        <div className="section-header">
          <h2>Featured Hardware</h2>
          <Link to="/products" className="section-link">
            Shop catalog
          </Link>
        </div>

        <div className="section-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="dark-card product-card">
              <div className="product-top">
                <h3>{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
              <p className="card-text">{product.summary}</p>
              <Link to="/products" className="card-action">
                Inspect item →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
