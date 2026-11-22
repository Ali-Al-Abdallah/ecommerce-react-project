import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { ProductsPage } from "../pages/ProductsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { Navbar } from "../components/Navbar";

function renderWithProviders(ui: React.ReactElement, initialRoute = "/products") {
  window.history.pushState({}, "Test page", initialRoute);
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <StoreProvider>{ui}</StoreProvider>
    </MemoryRouter>
  );
}

describe("Mono Desk Storefront Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 1: Product Filtering
  it("filters products by search query and category", () => {
    renderWithProviders(<ProductsPage />, "/products");

    const searchInput = screen.getByLabelText(/search products by name/i);
    fireEvent.change(searchInput, { target: { value: "USB-C" } });

    expect(screen.getByText("Hub 04 USB-C Desk Dock")).toBeInTheDocument();
    expect(screen.getByText("Braided USB-C Coiled Cable")).toBeInTheDocument();
    expect(screen.queryByText("MONO M1 Wireless Keyboard")).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Keyboards" }));

    expect(screen.getByText("MONO M1 Wireless Keyboard")).toBeInTheDocument();
    expect(screen.queryByText("Charcoal Wool Desk Mat")).not.toBeInTheDocument();
  });

  // Test 2: Shopping Cart
  it("adds a product to the cart and updates the navbar cart count", () => {
    renderWithProviders(
      <>
        <Navbar />
        <ProductsPage />
      </>,
      "/products"
    );

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    fireEvent.click(addButtons[0]);

    expect(screen.getByText(/cart \(1\)/i)).toBeInTheDocument();
  });

  // Test 3: Checkout Validation
  it("displays field validation errors and blocks order placement when form is invalid", () => {
    const sampleProduct = PRODUCTS[2]; // Hub 04 USB-C Desk Dock

    localStorage.setItem(
      "monodesk_cart",
      JSON.stringify([
        {
          product: sampleProduct,
          quantity: 1,
        },
      ])
    );

    renderWithProviders(<CheckoutPage />, "/checkout");

    const submitButton = screen.getByRole("button", { name: /place order/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/full name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/order confirmed/i)).not.toBeInTheDocument();
  });
});