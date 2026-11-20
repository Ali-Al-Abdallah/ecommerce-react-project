import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <strong>MONO DESK</strong>
        <p>Minimalist desk &amp; workspace hardware.</p>
      </div>

      <div className="footer-links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>

      <p className="footer-note">Frontend storefront demo project.</p>
    </footer>
  );
}