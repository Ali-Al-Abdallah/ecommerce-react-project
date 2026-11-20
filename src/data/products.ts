export type ProductCategory =
  | "Keyboards"
  | "Stands"
  | "Cables & Hubs"
  | "Desk Mats";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  summary: string;
  image: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "m1-keyboard",
    name: "MONO M1 Wireless Keyboard",
    category: "Keyboards",
    price: 165,
    summary: "Compact 75% CNC aluminum frame with quiet tactile linear switches.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
  },
  {
    id: "arc-riser",
    name: "Arc Aluminum Laptop Riser",
    category: "Stands",
    price: 89,
    summary: "Anodized matte-black desktop stand with pass-through cable slot.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dock-mini",
    name: "Hub 04 USB-C Desk Dock",
    category: "Cables & Hubs",
    price: 120,
    summary: "Single-cable 4K display, 100W PD charging, and peripheral hub.",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
    badge: "New",
  },
  {
    id: "felt-mat",
    name: "Charcoal Wool Desk Mat",
    category: "Desk Mats",
    price: 45,
    summary: "3mm dense merino wool felt pad with anti-slip natural cork base.",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "halo-bar",
    name: "Halo Asymmetric Light Bar",
    category: "Stands",
    price: 78,
    summary: "Zero-glare monitor lamp with stepless warm-to-cool dimming.",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coiled-usb",
    name: "Braided USB-C Coiled Cable",
    category: "Cables & Hubs",
    price: 34,
    summary: "Matte paracord sleeved cable with detachable metal aviator connector.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
];