import { useState, useMemo } from "react";
import { PRODUCTS, type ProductCategory } from "../data/products";
import { useStore } from "../context/StoreContext";
import "./ProductPage.css";

const CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Keyboards",
  "Stands",
  "Cables & Hubs",
  "Desk Mats",
];

type PriceRange = "all" | "under-50" | "50-100" | "100-150" | "over-150";
type SortOption = "default" | "price-asc" | "price-desc";

export function ProductsPage() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProductCategory>("All");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      if (query && !product.name.toLowerCase().includes(query)) {
        return false;
      }

      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      if (priceRange === "under-50" && product.price >= 50) return false;
      if (priceRange === "50-100" && (product.price < 50 || product.price > 100)) return false;
      if (priceRange === "100-150" && (product.price < 100 || product.price > 150)) return false;
      if (priceRange === "over-150" && product.price <= 150) return false;

      return true;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange("all");
    setSortBy("default");
  };

  const handleAddToCart = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1000);
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <div>
          <h1>Workspace Hardware</h1>
          <p>Minimalist tools engineered for clean, focused desk setups.</p>
        </div>

        <div className="controls-row">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="search-input"
            aria-label="Search products by name"
          />

          <div className="select-group">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange)}
              className="dark-select"
              aria-label="Filter by price range"
            >
              <option value="all">All Prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 – $100</option>
              <option value="100-150">$100 – $150</option>
              <option value="over-150">$150+</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="dark-select"
              aria-label="Sort products by price"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="filter-bar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products match your filters</h2>
          <p>Try adjusting your search term, category, or price range.</p>
          <button type="button" className="btn-reset" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const wishlisted = isInWishlist(product.id);
            const isAdded = recentlyAddedId === product.id;

            return (
              <article key={product.id} className="catalog-card">
                <div className="catalog-image-wrap">
                  {product.badge && <span className="catalog-badge">{product.badge}</span>}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="catalog-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' fill='%2371717a' font-family='sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle'>MONO DESK</text></svg>";
                    }}
                  />
                </div>

                <div className="catalog-body">
                  <span className="catalog-category">{product.category}</span>

                  <div className="catalog-title-row">
                    <h2>{product.name}</h2>
                    <span className="catalog-price">${product.price}</span>
                  </div>

                  <p className="catalog-summary">{product.summary}</p>

                  <div className="catalog-actions">
                    <button
                      type="button"
                      className={`btn-add-cart ${isAdded ? "added" : ""}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isAdded ? "Added ✓" : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      className={`btn-wishlist ${wishlisted ? "wishlisted" : ""}`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        wishlisted ? "Remove from wishlist" : "Add to wishlist"
                      }
                      title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {wishlisted ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

