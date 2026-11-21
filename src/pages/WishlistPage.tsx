import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import "./CartPage.css";

export function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishedProducts = PRODUCTS.filter((product) => wishlist.includes(product.id));

  if (wishedProducts.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your wishlist is empty</h2>
        <p>Save the desks you like and they will appear here.</p>
        <Link to="/products">Browse desks</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your wishlist</h1>
      <div className="wish-grid">
        {wishedProducts.map((product) => (
          <div key={product.id} className="wish-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <strong>${product.price}</strong>
            <div className="cart-buttons">
              <button type="button" onClick={() => addToCart(product)}>
                Add to cart
              </button>
              <button type="button" onClick={() => toggleWishlist(product.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}