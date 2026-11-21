import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { WishlistPage } from "./pages/WishlistPage";
import { CheckoutPage } from "./pages/CheckoutPage";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}