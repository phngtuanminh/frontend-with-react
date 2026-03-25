import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "../store/CartSlice";

/* ══════════════════════════════════════════════════════════════
   PLANT DATA — 18 plants across 6 categories
   ══════════════════════════════════════════════════════════════ */
const PLANTS = [
  // Tropical
  {
    id: 1, name: "Monstera Deliciosa", latin: "Monstera deliciosa",
    category: "Tropical", price: 34.99,
    desc: "Iconic split leaves that bring instant jungle drama to any interior.",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop&q=70",
    care: "Medium light · Water weekly",
  },
  {
    id: 2, name: "Bird of Paradise", latin: "Strelitzia reginae",
    category: "Tropical", price: 64.99,
    desc: "Striking paddle leaves that command attention in any sun-drenched room.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=500&auto=format&fit=crop&q=70",
    care: "Bright light · Water bi-weekly",
  },
  {
    id: 3, name: "Calathea Orbifolia", latin: "Calathea orbifolia",
    category: "Tropical", price: 28.99,
    desc: "Dramatic silver-striped leaves that fold up at night like hands in prayer.",
    img: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=500&auto=format&fit=crop&q=70",
    care: "Low–medium light · Keep moist",
  },
  // Low-light
  {
    id: 4, name: "Snake Plant", latin: "Dracaena trifasciata",
    category: "Low-light", price: 22.99,
    desc: "Nearly indestructible — a champion air purifier for any dim corner.",
    img: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=500&auto=format&fit=crop&q=70",
    care: "Low light · Water monthly",
  },
  {
    id: 5, name: "ZZ Plant", latin: "Zamioculcas zamiifolia",
    category: "Low-light", price: 26.99,
    desc: "Glossy dark leaves and drought-tolerance make this the ultimate low-effort plant.",
    img: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500&auto=format&fit=crop&q=70",
    care: "Low light · Water monthly",
  },
  {
    id: 6, name: "Cast Iron Plant", latin: "Aspidistra elatior",
    category: "Low-light", price: 19.99,
    desc: "Lives up to its name — thrives on neglect in the darkest corners.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=70",
    care: "Low light · Water sparingly",
  },
  // Flowering
  {
    id: 7, name: "Peace Lily", latin: "Spathiphyllum wallisii",
    category: "Flowering", price: 19.99,
    desc: "Elegant white blooms and a soothing presence. Loves shade.",
    img: "https://images.unsplash.com/photo-1587334207408-0c7b6b1e6e36?w=500&auto=format&fit=crop&q=70",
    care: "Low light · Keep moist",
  },
  {
    id: 8, name: "Anthurium", latin: "Anthurium andraeanum",
    category: "Flowering", price: 32.99,
    desc: "Waxy, heart-shaped blooms in vivid red — long-lasting and show-stopping.",
    img: "https://images.unsplash.com/photo-1612540139150-4b5fd5836ed2?w=500&auto=format&fit=crop&q=70",
    care: "Medium light · Water weekly",
  },
  {
    id: 9, name: "African Violet", latin: "Saintpaulia ionantha",
    category: "Flowering", price: 12.99,
    desc: "Cheerful clusters of velvet blooms — perfect for a sunny windowsill.",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691a59c?w=500&auto=format&fit=crop&q=70",
    care: "Bright indirect · Keep moist",
  },
  // Trailing
  {
    id: 10, name: "Golden Pothos", latin: "Epipremnum aureum",
    category: "Trailing", price: 14.99,
    desc: "Cascading heart-shaped leaves — effortless, fast-growing, forgiving.",
    img: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500&auto=format&fit=crop&q=70",
    care: "Low–bright light · Water weekly",
  },
  {
    id: 11, name: "String of Pearls", latin: "Senecio rowleyanus",
    category: "Trailing", price: 18.99,
    desc: "Delicate bead-like foliage that drapes beautifully from shelves.",
    img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500&auto=format&fit=crop&q=70",
    care: "Bright light · Water sparingly",
  },
  {
    id: 12, name: "Heartleaf Philodendron", latin: "Philodendron hederaceum",
    category: "Trailing", price: 16.99,
    desc: "Lush, velvety green hearts that trail or climb with ease.",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=70",
    care: "Low–medium light · Water weekly",
  },
  // Statement
  {
    id: 13, name: "Fiddle Leaf Fig", latin: "Ficus lyrata",
    category: "Statement", price: 54.99,
    desc: "The architect's favourite — bold, sculptural, undeniably striking.",
    img: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?w=500&auto=format&fit=crop&q=70",
    care: "Bright indirect · Water weekly",
  },
  {
    id: 14, name: "Rubber Plant", latin: "Ficus elastica",
    category: "Statement", price: 39.99,
    desc: "Deep burgundy leaves with a high-gloss finish. A bold classic.",
    img: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=500&auto=format&fit=crop&q=70",
    care: "Medium–bright · Water bi-weekly",
  },
  {
    id: 15, name: "Olive Tree", latin: "Olea europaea",
    category: "Statement", price: 79.99,
    desc: "Bring Mediterranean warmth indoors with this silvery, sculptural tree.",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=70",
    care: "Full sun · Water bi-weekly",
  },
  // Succulents
  {
    id: 16, name: "Echeveria", latin: "Echeveria elegans",
    category: "Succulents", price: 9.99,
    desc: "Rosette-shaped beauty in dusty lavender — minimal care, maximum charm.",
    img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&auto=format&fit=crop&q=70",
    care: "Full sun · Water sparingly",
  },
  {
    id: 17, name: "Aloe Vera", latin: "Aloe barbadensis",
    category: "Succulents", price: 13.99,
    desc: "Medicinal and architectural — nature's own first-aid kit on your shelf.",
    img: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?w=500&auto=format&fit=crop&q=70",
    care: "Bright light · Water monthly",
  },
  {
    id: 18, name: "Haworthia", latin: "Haworthia fasciata",
    category: "Succulents", price: 11.99,
    desc: "Tiny, textured, and totally endearing — perfect for desks and shelves.",
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&auto=format&fit=crop&q=70",
    care: "Low–medium light · Water monthly",
  },
];

const CATEGORIES = ["All", "Tropical", "Low-light", "Flowering", "Trailing", "Statement", "Succulents"];

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/** Individual plant card */
function PlantCard({ plant, cartItem, onAdd, onRemove, onUpdateQty }) {
  const inCart = !!cartItem;

  return (
    <article className="pl-card">
      {/* Image */}
      <div className="pl-card__img-wrap">
        <img src={plant.img} alt={plant.name} loading="lazy" />
        <span className="pl-card__category">{plant.category}</span>
      </div>

      {/* Body */}
      <div className="pl-card__body">
        <h3 className="pl-card__name">{plant.name}</h3>
        <p className="pl-card__latin">{plant.latin}</p>
        <p className="pl-card__care">🌿 {plant.care}</p>
        <p className="pl-card__desc">{plant.desc}</p>

        {/* Footer */}
        <div className="pl-card__footer">
          <span className="pl-card__price">${plant.price.toFixed(2)}</span>

          {!inCart ? (
            /* Add to Cart */
            <button
              className="pl-btn pl-btn--add"
              onClick={() => onAdd(plant)}
              aria-label={`Add ${plant.name} to cart`}
            >
              + Add to Cart
            </button>
          ) : (
            /* Quantity controls */
            <div className="pl-qty">
              <button
                className="pl-qty__btn"
                onClick={() => onUpdateQty(plant.id, cartItem.quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="pl-qty__count">{cartItem.quantity}</span>
              <button
                className="pl-qty__btn"
                onClick={() => onUpdateQty(plant.id, cartItem.quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
              <button
                className="pl-qty__remove"
                onClick={() => onRemove(plant.id)}
                aria-label={`Remove ${plant.name} from cart`}
              >
                🗑
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Cart summary banner shown when cart has items */
function CartSummaryBanner({ count, total, onGoToCart }) {
  if (count === 0) return null;
  return (
    <div className="pl-cart-banner">
      <div className="pl-cart-banner__info">
        <span className="pl-cart-banner__count">🛒 {count} {count === 1 ? "item" : "items"} in cart</span>
        <span className="pl-cart-banner__total">Total: <strong>${total.toFixed(2)}</strong></span>
      </div>
      <button className="pl-btn pl-btn--cart" onClick={onGoToCart}>
        View Cart →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT — ProductList
   ══════════════════════════════════════════════════════════════ */
export default function ProductList({ onNavigateToCart }) {
  const dispatch = useDispatch();

  // Redux state
  const cartItems  = useSelector(selectCartItems);
  const cartCount  = useSelector(selectCartCount);
  const cartTotal  = useSelector(selectCartTotal);

  // Local UI state
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [sortBy,         setSortBy]         = useState("default");

  /* ── Helpers ── */
  const getCartItem = (plantId) => cartItems.find((i) => i.id === plantId);

  const handleAdd          = (plant)        => dispatch(addItem(plant));
  const handleRemove       = (id)           => dispatch(removeItem(id));
  const handleUpdateQty    = (id, quantity) => dispatch(updateQuantity({ id, quantity }));
  const handleGoToCart     = ()             => onNavigateToCart?.();

  /* ── Filtered & sorted plant list ── */
  const visiblePlants = useMemo(() => {
    let list = PLANTS;

    // Category filter
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.latin.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  /* ══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Inline styles — scoped to ProductList */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        /* ── Layout ── */
        .pl-page {
          min-height: 100vh;
          background: #100e0a;
          font-family: 'Jost', sans-serif;
          color: #f0e6d3;
          padding-bottom: 6rem;
        }

        /* ── Page header ── */
        .pl-header {
          padding: clamp(5rem, 10vw, 7rem) 2rem 2rem;
          text-align: center;
          background: linear-gradient(to bottom, #0d160d, #100e0a);
          border-bottom: 1px solid rgba(125,170,111,0.12);
        }
        .pl-header__eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b8975a;
          margin-bottom: 0.75rem;
        }
        .pl-header__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          font-weight: 300;
          line-height: 1.1;
          color: #f0e6d3;
          margin-bottom: 0.5rem;
        }
        .pl-header__title em { font-style: italic; color: #7daa6f; }
        .pl-header__sub {
          font-size: 0.9rem;
          color: rgba(240,230,211,0.5);
          margin-bottom: 2rem;
        }

        /* ── Cart banner ── */
        .pl-cart-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1200px;
          margin: 1.5rem auto 0;
          padding: 1rem 1.5rem;
          background: rgba(45,80,22,0.35);
          border: 1px solid rgba(125,170,111,0.3);
          border-radius: 2px;
        }
        .pl-cart-banner__info { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
        .pl-cart-banner__count { font-size: 0.9rem; color: #f0e6d3; }
        .pl-cart-banner__total { font-size: 0.9rem; color: #d4b483; }
        .pl-cart-banner__total strong { font-size: 1.05rem; }

        /* ── Controls bar ── */
        .pl-controls {
          max-width: 1200px;
          margin: 2rem auto 0;
          padding: 0 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
        }

        /* Search */
        .pl-search {
          position: relative;
          flex: 1;
          min-width: 200px;
          max-width: 320px;
        }
        .pl-search input {
          width: 100%;
          background: #1a160f;
          border: 1px solid rgba(125,170,111,0.2);
          color: #f0e6d3;
          padding: 0.65rem 1rem 0.65rem 2.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .pl-search input::placeholder { color: rgba(240,230,211,0.3); }
        .pl-search input:focus { border-color: rgba(125,170,111,0.5); }
        .pl-search__icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          pointer-events: none;
          opacity: 0.5;
        }

        /* Sort */
        .pl-sort select {
          background: #1a160f;
          border: 1px solid rgba(125,170,111,0.2);
          color: #f0e6d3;
          padding: 0.65rem 1rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          outline: none;
          cursor: pointer;
        }

        /* Results count */
        .pl-results-count {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          color: rgba(240,230,211,0.38);
          text-transform: uppercase;
        }

        /* ── Category tabs ── */
        .pl-categories {
          max-width: 1200px;
          margin: 1.5rem auto 0;
          padding: 0 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pl-cat-btn {
          background: transparent;
          border: 1px solid rgba(125,170,111,0.18);
          color: rgba(240,230,211,0.55);
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          cursor: pointer;
          transition: all 0.25s;
        }
        .pl-cat-btn:hover {
          border-color: rgba(125,170,111,0.45);
          color: #7daa6f;
        }
        .pl-cat-btn.active {
          background: #4a7c3f;
          border-color: #4a7c3f;
          color: #f0e6d3;
        }

        /* ── Plant grid ── */
        .pl-grid {
          max-width: 1200px;
          margin: 2.5rem auto 0;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.5rem;
        }

        /* ── Plant card ── */
        .pl-card {
          background: #1a160f;
          border: 1px solid rgba(125,170,111,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .pl-card:hover {
          border-color: rgba(125,170,111,0.35);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(10,20,10,0.5);
        }
        .pl-card__img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #2d3d28;
        }
        .pl-card__img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .pl-card:hover .pl-card__img-wrap img { transform: scale(1.07); }
        .pl-card__category {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(10,20,10,0.75);
          backdrop-filter: blur(4px);
          color: #7daa6f;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.28rem 0.65rem;
        }
        .pl-card__body {
          padding: 1.4rem 1.4rem 1.2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .pl-card__name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f0e6d3;
          margin-bottom: 0.15rem;
        }
        .pl-card__latin {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: #7daa6f;
          margin-bottom: 0.5rem;
        }
        .pl-card__care {
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          color: rgba(240,230,211,0.38);
          margin-bottom: 0.6rem;
        }
        .pl-card__desc {
          font-size: 0.84rem;
          line-height: 1.7;
          color: rgba(240,230,211,0.52);
          flex: 1;
          margin-bottom: 1.25rem;
        }
        .pl-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .pl-card__price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          color: #d4b483;
          white-space: nowrap;
        }

        /* ── Buttons ── */
        .pl-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          padding: 0.55rem 1.1rem;
          white-space: nowrap;
        }
        .pl-btn--add {
          background: transparent;
          border: 1px solid rgba(125,170,111,0.35);
          color: #7daa6f;
        }
        .pl-btn--add:hover {
          background: #4a7c3f;
          border-color: #4a7c3f;
          color: #f0e6d3;
        }
        .pl-btn--cart {
          background: #4a7c3f;
          color: #f0e6d3;
          border: 1px solid #4a7c3f;
          padding: 0.6rem 1.4rem;
        }
        .pl-btn--cart:hover {
          background: #7daa6f;
          border-color: #7daa6f;
        }

        /* ── Quantity controls ── */
        .pl-qty {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .pl-qty__btn {
          width: 28px;
          height: 28px;
          background: rgba(125,170,111,0.12);
          border: 1px solid rgba(125,170,111,0.25);
          color: #f0e6d3;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          padding: 0;
          line-height: 1;
        }
        .pl-qty__btn:hover { background: rgba(125,170,111,0.28); }
        .pl-qty__count {
          min-width: 28px;
          text-align: center;
          font-size: 0.9rem;
          color: #f0e6d3;
          font-weight: 500;
        }
        .pl-qty__remove {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          opacity: 0.45;
          padding: 0 0.15rem;
          transition: opacity 0.2s;
          line-height: 1;
        }
        .pl-qty__remove:hover { opacity: 1; }

        /* ── Empty state ── */
        .pl-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(240,230,211,0.3);
        }
        .pl-empty__icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .pl-empty__text { font-size: 1rem; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .pl-controls { flex-direction: column; align-items: stretch; }
          .pl-search   { max-width: 100%; }
          .pl-grid     { grid-template-columns: 1fr; }
          .pl-cart-banner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="pl-page">
        {/* ── Header ── */}
        <header className="pl-header">
          <p className="pl-header__eyebrow">Paradise Nursery · Our Collection</p>
          <h1 className="pl-header__title">
            Shop Our <em>Plants</em>
          </h1>
          <p className="pl-header__sub">{PLANTS.length} handpicked varieties for every home &amp; lifestyle</p>

          {/* Cart summary banner */}
          <CartSummaryBanner
            count={cartCount}
            total={cartTotal}
            onGoToCart={handleGoToCart}
          />
        </header>

        {/* ── Category filter tabs ── */}
        <div className="pl-categories" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`pl-cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Controls: search + sort + count ── */}
        <div className="pl-controls">
          {/* Search */}
          <div className="pl-search">
            <span className="pl-search__icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search plants…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search plants"
            />
          </div>

          {/* Sort */}
          <div className="pl-sort">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plants"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>

          {/* Result count */}
          <p className="pl-results-count">
            {visiblePlants.length} {visiblePlants.length === 1 ? "result" : "results"}
          </p>
        </div>

        {/* ── Plant grid ── */}
        <main className="pl-grid" aria-label="Plant catalogue">
          {visiblePlants.length > 0 ? (
            visiblePlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                cartItem={getCartItem(plant.id)}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onUpdateQty={handleUpdateQty}
              />
            ))
          ) : (
            <div className="pl-empty" role="status">
              <span className="pl-empty__icon">🌿</span>
              <p className="pl-empty__text">
                No plants found for "<strong>{searchQuery}</strong>".<br />
                Try a different search or category.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
