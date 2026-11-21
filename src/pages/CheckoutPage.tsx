import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "./CartPage.css";

export function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 25;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Nothing to check out</h2>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Checkout</h1>
      <div className="cart-summary">
        <p>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
        <p>Subtotal: ${subtotal}</p>
        <p>Shipping: {shipping === 0 ? "Free" : `$${shipping}`}</p>
        <h3>Total: ${subtotal + shipping}</h3>
        <button type="button" onClick={clearCart}>Place order</button>
      </div>
    </div>
  );
}