import { Link } from "react-router-dom";
import "./Navbar.css"

export function Navbar() {
  return (
    <div className="site-header">
      <div className="announcement-banner">
        Welcome to MONO DESK — Minimalist Workspace Hardware
      </div>

      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          MONO DESK
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Products</Link>
          <Link to="/wishlist" className="navbar-link">Wishlist (0)</Link>
          <Link to="/cart" className="navbar-link">Cart (0)</Link>
        </div>
      </nav>
    </div>
  );
} 
