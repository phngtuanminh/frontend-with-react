import { useState, useEffect } from "react";
import "./App.css";

/* ── Sample plant data ── */
const PLANTS = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    latin: "Monstera deliciosa",
    category: "Tropical",
    price: 34.99,
    desc: "Iconic split leaves that bring instant jungle drama to any interior.",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 2,
    name: "Snake Plant",
    latin: "Dracaena trifasciata",
    category: "Low-light",
    price: 22.99,
    desc: "Nearly indestructible and a champion air purifier for any room.",
    img: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 3,
    name: "Peace Lily",
    latin: "Spathiphyllum wallisii",
    category: "Flowering",
    price: 19.99,
    desc: "Elegant white blooms with a soothing presence. Loves shade.",
    img: "https://images.unsplash.com/photo-1587334207408-0c7b6b1e6e36?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    latin: "Ficus lyrata",
    category: "Statement",
    price: 54.99,
    desc: "The architect's favourite — bold, sculptural, undeniably striking.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 5,
    name: "Golden Pothos",
    latin: "Epipremnum aureum",
    category: "Trailing",
    price: 14.99,
    desc: "Cascading vines of heart-shaped leaves — effortless, fast-growing.",
    img: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 6,
    name: "Rubber Plant",
    latin: "Ficus elastica",
    category: "Statement",
    price: 39.99,
    desc: "Deep burgundy leaves with a high-gloss finish. A bold classic.",
    img: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=600&auto=format&fit=crop&q=70",
  },
];

const FEATURES = [
  { icon: "🌱", title: "Sustainably Grown", text: "Every plant is nurtured using eco-conscious practices from seed to doorstep." },
  { icon: "📦", title: "Safe Delivery", text: "Custom packaging ensures your plants arrive healthy and stress-free." },
  { icon: "💬", title: "Expert Support", text: "Our botanists are on hand to help your plants — and you — thrive." },
];

/* ── Navbar ── */
function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <a href="#" className="navbar__logo">
        Paradise<span>Nursery</span>
      </a>
      <ul className="navbar__links">
        <li><a href="#plants">Shop</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="navbar__cart" onClick={onCartClick} aria-label="Open cart">
        🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </nav>
  );
}

/* ── Hero ── */
function Hero({ onGetStarted }) {
  return (
    <section className="hero" aria-label="Paradise Nursery hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Est. 2018 · Hanoi, Vietnam</p>

        <h1 className="hero__title">
          Paradise<br />
          <em>Nursery</em>
        </h1>

        <p className="hero__subtitle">Where Every Leaf Tells a Story</p>

        <div className="hero__divider" />

        <p className="hero__description">
          Bring nature indoors. We curate rare and beloved houseplants,
          delivered with care to transform your space into a living sanctuary.
        </p>

        <div className="hero__actions">
          {/* ── GET STARTED BUTTON ── */}
          <button className="btn btn--primary" onClick={onGetStarted}>
            🌿 Get Started
          </button>
          <a href="#about" className="btn btn--outline">
            Our Story
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ── Features Strip ── */
function Features() {
  return (
    <section className="features" aria-label="Why Paradise Nursery">
      {FEATURES.map((f) => (
        <div className="feature-card" key={f.title}>
          <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
          <h3 className="feature-card__title">{f.title}</h3>
          <p className="feature-card__text">{f.text}</p>
        </div>
      ))}
    </section>
  );
}

/* ── Plant Card ── */
function PlantCard({ plant, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(plant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="plant-card">
      <div className="plant-card__img-wrap">
        <img src={plant.img} alt={plant.name} loading="lazy" />
      </div>
      <span className="plant-card__badge">{plant.category}</span>
      <div className="plant-card__body">
        <h3 className="plant-card__name">{plant.name}</h3>
        <p className="plant-card__latin">{plant.latin}</p>
        <p className="plant-card__desc">{plant.desc}</p>
        <div className="plant-card__footer">
          <span className="plant-card__price">${plant.price.toFixed(2)}</span>
          <button
            className={`plant-card__add${added ? " added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Plant Grid Section ── */
function ShopSection({ onAdd }) {
  return (
    <section id="plants" className="section">
      <p className="section__label">Our Collection</p>
      <h2 className="section__title">
        Handpicked <em>Plants</em><br />for Every Home
      </h2>
      <div className="plant-grid">
        {PLANTS.map((p) => (
          <PlantCard key={p.id} plant={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

/* ── Cart Drawer ── */
function CartDrawer({ items, onClose, onRemove }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty — add some plants! 🌿</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">${item.price.toFixed(2)} × {item.qty}</p>
                  </div>
                  <button className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <p className="footer__logo">ParadiseNursery</p>
      <p className="footer__tagline">Grow Something Beautiful</p>
      <div className="footer__divider" />
      <p className="footer__copy">
        © {new Date().getFullYear()} Paradise Nursery · Hanoi, Vietnam · All rights reserved.
      </p>
    </footer>
  );
}

/* ════════════════════════════════════════
   ROOT APP
   ════════════════════════════════════════ */
export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /* Add item to cart */
  const handleAdd = (plant) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === plant.id);
      if (existing) {
        return prev.map((i) => i.id === plant.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...plant, qty: 1 }];
    });
  };

  /* Remove item from cart */
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  /* Get Started scrolls to plant shop */
  const handleGetStarted = () => {
    document.getElementById("plants")?.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="app">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <ShopSection onAdd={handleAdd} />
      <Footer />

      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
