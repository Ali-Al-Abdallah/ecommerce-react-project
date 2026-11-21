import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "./CartPage.css";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Find a desk you like and add it to your cart.</p>
        <Link to="/products">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.product.id} className="cart-row">
            <img src={item.product.image} alt={item.product.name} />
            <div className="cart-name">
              <strong>{item.product.name}</strong>
              <span>{item.product.category}</span>
            </div>
            <span>${item.product.price}</span>
            <div className="cart-qty">
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                aria-label={`Decrease ${item.product.name} quantity`}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                aria-label={`Increase ${item.product.name} quantity`}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="cart-remove"
              onClick={() => removeFromCart(item.product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Subtotal: ${subtotal}</p>
        <p>Shipping: {shipping === 0 ? "Free" : `$${shipping}`}</p>
        <h3>Total: ${total}</h3>
        <div className="cart-buttons">
          <Link to="/products">Continue shopping</Link>
          <button type="button" onClick={clearCart}>Clear cart</button>
          <Link to="/checkout">Proceed to checkout</Link>
        </div>
      </div>
    </div>
  );
}