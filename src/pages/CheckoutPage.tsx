import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useStore } from "../context/StoreContext";
import "./CartPage.css";

const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Full name must contain only letters (no numbers or symbols)"
    ),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Phone number contains invalid characters"),
  address: z
    .string()
    .trim()
    .min(5, "Street address must be at least 5 characters")
    .regex(
      /^(?=.*[A-Za-z])[A-Za-z0-9\s.,'/-]+$/,
      "Address must include a street or building name and valid characters"
    ),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "City must contain only letters (no numbers or symbols)"
    ),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Country must contain only letters (no numbers or symbols)"
    ),
  deliveryNotes: z
    .string()
    .trim()
    .max(250, "Delivery notes must be 250 characters or fewer")
    .optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;
type CheckoutErrors = Partial<Record<keyof CheckoutFormData, string>>;

interface PlacedOrderSummary {
  orderId: string;
  customer: CheckoutFormData;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

const INITIAL_FORM: CheckoutFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  deliveryNotes: "",
};

export function CheckoutPage() {
  const { cart, clearCart } = useStore();

  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placedOrder, setPlacedOrder] = useState<PlacedOrderSummary | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Requirement 3: Checkout must not proceed when the cart is empty
    if (cart.length === 0) {
      return;
    }

    const parsed = checkoutSchema.safeParse(formData);

    // Requirements 1 & 2: Show field-level errors and block submission if invalid
    if (!parsed.success) {
      const fieldErrors: CheckoutErrors = {};
      for (const issue of parsed.error.issues) {
        const fieldName = issue.path[0] as keyof CheckoutFormData | undefined;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const orderSnapshot: PlacedOrderSummary = {
      orderId: `MONO-${Date.now().toString().slice(-6)}`,
      customer: parsed.data,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      shipping,
      total,
    };

    clearCart();
    setFormData(INITIAL_FORM);
    setPlacedOrder(orderSnapshot);
  };

  if (placedOrder) {
    return (
      <div className="cart-page">
        <div className="checkout-confirmation">
          <span className="checkout-badge">Order Confirmed</span>
          <h1>Thank you, {placedOrder.customer.fullName}</h1>
          <p className="checkout-meta">
            Order ID: <strong>{placedOrder.orderId}</strong> · Confirmation sent to{" "}
            <strong>{placedOrder.customer.email}</strong>
          </p>

          <div className="checkout-review-box">
            <h2>Delivery Destination</h2>
            <p>{placedOrder.customer.address}</p>
            <p>
              {placedOrder.customer.city}, {placedOrder.customer.country}
            </p>
            <p>Phone: {placedOrder.customer.phone}</p>
            {placedOrder.customer.deliveryNotes && (
              <p>Notes: {placedOrder.customer.deliveryNotes}</p>
            )}
          </div>

          <div className="checkout-review-box">
            <h2>Items Ordered</h2>
            {placedOrder.items.map((item) => (
              <div key={item.id} className="checkout-line-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="checkout-divider" />
            <div className="checkout-line-item">
              <span>Subtotal</span>
              <span>${placedOrder.subtotal}</span>
            </div>
            <div className="checkout-line-item">
              <span>Shipping</span>
              <span>{placedOrder.shipping === 0 ? "Free" : `$${placedOrder.shipping}`}</span>
            </div>
            <div className="checkout-line-item checkout-total-row">
              <strong>Total Paid</strong>
              <strong>${placedOrder.total}</strong>
            </div>
          </div>

          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Nothing to check out</h2>
        <p>Add workspace hardware to your cart before proceeding to checkout.</p>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <h2>Delivery Information</h2>

          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              className={errors.fullName ? "input-error" : ""}
            />
            {errors.fullName && (
              <span className="field-error" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                placeholder="name@example.com"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                placeholder="+961 70 000 000"
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && (
                <span className="field-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              placeholder="Building, street, floor or landmark"
              className={errors.address ? "input-error" : ""}
            />
            {errors.address && (
              <span className="field-error" role="alert">
                {errors.address}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                className={errors.city ? "input-error" : ""}
              />
              {errors.city && (
                <span className="field-error" role="alert">
                  {errors.city}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                placeholder="Lebanon"
                className={errors.country ? "input-error" : ""}
              />
              {errors.country && (
                <span className="field-error" role="alert">
                  {errors.country}
                </span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="deliveryNotes">Delivery Notes (Optional)</label>
            <textarea
              id="deliveryNotes"
              rows={3}
              value={formData.deliveryNotes ?? ""}
              onChange={(e) => handleFieldChange("deliveryNotes", e.target.value)}
              placeholder="Call upon arrival, gate code, etc."
              className={errors.deliveryNotes ? "input-error" : ""}
            />
            {errors.deliveryNotes && (
              <span className="field-error" role="alert">
                {errors.deliveryNotes}
              </span>
            )}
          </div>

          <button type="submit" className="btn-place-order">
            Place Order · ${total}
          </button>
        </form>

        <aside className="cart-summary">
          <h2>Order Review</h2>

          <div className="checkout-items-list">
            {cart.map((item) => (
              <div key={item.product.id} className="checkout-line-item">
                <span>
                  {item.product.name} <strong>× {item.quantity}</strong>
                </span>
                <span>${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="checkout-divider" />

          <p>{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          <p>Subtotal: ${subtotal}</p>
          <p>Shipping: {shipping === 0 ? "Free" : `$${shipping}`}</p>
          <h3>Total: ${total}</h3>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;