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
   CONSTANTS
   ══════════════════════════════════════════════════════════════ */
const SHIPPING_THRESHOLD = 75;   // free shipping above this amount
const SHIPPING_COST      = 9.99;
const TAX_RATE           = 0.08; // 8 %

/* ══════════════════════════════════════════════════════════════
   SINGLE CART ITEM ROW
   ══════════════════════════════════════════════════════════════ */
function CartItemRow({ item, onAdd, onRemove, onUpdateQty }) {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <li className="ci-row">
      {/* Plant image */}
      <div className="ci-row__img-wrap">
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>

      {/* Info */}
      <div className="ci-row__info">
        <h3 className="ci-row__name">{item.name}</h3>
        <p className="ci-row__latin">{item.latin}</p>
        <span className="ci-row__category">{item.category}</span>
        <p className="ci-row__unit-price">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="ci-row__qty">
        <button
          className="ci-qty-btn"
          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>
        <span className="ci-qty-count" aria-live="polite">{item.quantity}</span>
        <button
          className="ci-qty-btn"
          onClick={() => onAdd(item)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="ci-row__line-total">
        <span className="ci-row__total-label">Subtotal</span>
        <span className="ci-row__total-value">${lineTotal}</span>
      </div>

      {/* Remove */}
      <button
        className="ci-row__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
        title="Remove item"
      >
        ✕
      </button>
    </li>
  );
}

/* ══════════════════════════════════════════════════════════════
   ORDER SUMMARY PANEL
   ══════════════════════════════════════════════════════════════ */
function OrderSummary({ subtotal, onContinueShopping, onCheckout }) {
  const shippingFree  = subtotal >= SHIPPING_THRESHOLD;
  const shipping      = shippingFree ? 0 : SHIPPING_COST;
  const tax           = subtotal * TAX_RATE;
  const total         = subtotal + shipping + tax;
  const amountToFree  = (SHIPPING_THRESHOLD - subtotal).toFixed(2);

  return (
    <aside className="ci-summary">
      <h2 className="ci-summary__title">Order Summary</h2>

      {/* Free shipping progress */}
      {!shippingFree && (
        <div className="ci-shipping-progress">
          <p className="ci-shipping-progress__msg">
            Add <strong>${amountToFree}</strong> more for free shipping 🌿
          </p>
          <div className="ci-shipping-progress__bar">
            <div
              className="ci-shipping-progress__fill"
              style={{ width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      {shippingFree && (
        <p className="ci-shipping-badge">✓ You qualify for free shipping!</p>
      )}

      {/* Line items */}
      <dl className="ci-summary__lines">
        <div className="ci-summary__line">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
        <div className="ci-summary__line">
          <dt>Shipping</dt>
          <dd>{shippingFree ? <span className="ci-free">Free</span> : `$${shipping.toFixed(2)}`}</dd>
        </div>
        <div className="ci-summary__line">
          <dt>Tax (8%)</dt>
          <dd>${tax.toFixed(2)}</dd>
        </div>
        <div className="ci-summary__line ci-summary__line--total">
          <dt>Total</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>

      {/* Actions */}
      <button
        className="ci-btn ci-btn--checkout"
        onClick={onCheckout}
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>
      <button
        className="ci-btn ci-btn--continue"
        onClick={onContinueShopping}
        aria-label="Continue shopping"
      >
        ← Continue Shopping
      </button>

      {/* Trust badges */}
      <ul className="ci-trust">
        <li>🔒 Secure checkout</li>
        <li>🌱 Sustainably packed</li>
        <li>↩ 30-day returns</li>
      </ul>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════════
   EMPTY CART STATE
   ══════════════════════════════════════════════════════════════ */
function EmptyCart({ onContinueShopping }) {
  return (
    <div className="ci-empty">
      <span className="ci-empty__icon" aria-hidden="true">🛒</span>
      <h2 className="ci-empty__title">Your cart is empty</h2>
      <p className="ci-empty__sub">
        Looks like you haven't added any plants yet.<br />
        Explore our collection and bring some green into your life!
      </p>
      <button
        className="ci-btn ci-btn--checkout"
        onClick={onContinueShopping}
      >
        Shop Plants
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT — CartItem (Shopping Cart Page)
   ══════════════════════════════════════════════════════════════ */
export default function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch   = useDispatch();
  const cartItems  = useSelector(selectCartItems);
  const cartCount  = useSelector(selectCartCount);
  const cartTotal  = useSelector(selectCartTotal);

  /* ── Handlers ── */
  const handleAdd       = (item)           => dispatch(addItem(item));
  const handleRemove    = (id)             => dispatch(removeItem(id));
  const handleUpdateQty = (id, quantity)   => dispatch(updateQuantity({ id, quantity }));
  const handleCheckout  = ()               => onCheckout?.();
  const handleContinue  = ()               => onContinueShopping?.();

  /* ══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        /* ── Page shell ── */
        .ci-page {
          min-height: 100vh;
          background: #100e0a;
          font-family: 'Jost', sans-serif;
          color: #f0e6d3;
          padding-bottom: 6rem;
        }

        /* ── Page header ── */
        .ci-header {
          padding: clamp(5rem, 10vw, 7rem) 2rem 2.5rem;
          background: linear-gradient(to bottom, #0d160d, #100e0a);
          border-bottom: 1px solid rgba(125,170,111,0.12);
          text-align: center;
        }
        .ci-header__eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b8975a;
          margin-bottom: 0.75rem;
        }
        .ci-header__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 300;
          color: #f0e6d3;
          line-height: 1.1;
        }
        .ci-header__title em { font-style: italic; color: #7daa6f; }
        .ci-header__count {
          margin-top: 0.6rem;
          font-size: 0.85rem;
          color: rgba(240,230,211,0.45);
        }

        /* ── Layout: list + summary ── */
        .ci-layout {
          max-width: 1200px;
          margin: 2.5rem auto 0;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ci-layout { grid-template-columns: 1fr; }
        }

        /* ── Cart items list ── */
        .ci-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        /* ── Single item row ── */
        .ci-row {
          display: grid;
          grid-template-columns: 90px 1fr auto auto auto;
          gap: 1.25rem;
          align-items: center;
          background: #1a160f;
          border: 1px solid rgba(125,170,111,0.1);
          padding: 1.25rem 1.5rem;
          transition: border-color 0.3s;
        }
        .ci-row:hover { border-color: rgba(125,170,111,0.28); }

        .ci-row__img-wrap {
          width: 90px;
          height: 90px;
          overflow: hidden;
          flex-shrink: 0;
          background: #2d3d28;
        }
        .ci-row__img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .ci-row:hover .ci-row__img-wrap img { transform: scale(1.06); }

        .ci-row__info { min-width: 0; }
        .ci-row__name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f0e6d3;
          margin-bottom: 0.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ci-row__latin {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.82rem;
          color: #7daa6f;
          margin-bottom: 0.35rem;
        }
        .ci-row__category {
          display: inline-block;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b8975a;
          border: 1px solid rgba(184,151,90,0.3);
          padding: 0.15rem 0.5rem;
          margin-bottom: 0.4rem;
        }
        .ci-row__unit-price {
          font-size: 0.8rem;
          color: rgba(240,230,211,0.4);
        }

        /* Qty controls */
        .ci-row__qty {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .ci-qty-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(125,170,111,0.1);
          border: 1px solid rgba(125,170,111,0.22);
          color: #f0e6d3;
          font-size: 1.1rem;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          transition: background 0.2s;
        }
        .ci-qty-btn:hover { background: rgba(125,170,111,0.25); }
        .ci-qty-count {
          min-width: 28px;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 500;
          color: #f0e6d3;
        }

        /* Line total */
        .ci-row__line-total {
          text-align: right;
          min-width: 80px;
        }
        .ci-row__total-label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,230,211,0.3);
          margin-bottom: 0.2rem;
        }
        .ci-row__total-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          color: #d4b483;
        }

        /* Remove button */
        .ci-row__remove {
          background: none;
          border: none;
          color: rgba(240,230,211,0.25);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.2s;
          line-height: 1;
        }
        .ci-row__remove:hover { color: #e07070; }

        /* ── Order summary ── */
        .ci-summary {
          background: #1a160f;
          border: 1px solid rgba(125,170,111,0.15);
          padding: 2rem;
          position: sticky;
          top: 5rem;
        }
        .ci-summary__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #f0e6d3;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(125,170,111,0.12);
        }

        /* Shipping progress */
        .ci-shipping-progress { margin-bottom: 1.25rem; }
        .ci-shipping-progress__msg {
          font-size: 0.8rem;
          color: rgba(240,230,211,0.6);
          margin-bottom: 0.5rem;
        }
        .ci-shipping-progress__bar {
          height: 4px;
          background: rgba(125,170,111,0.15);
          border-radius: 2px;
          overflow: hidden;
        }
        .ci-shipping-progress__fill {
          height: 100%;
          background: linear-gradient(90deg, #4a7c3f, #7daa6f);
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .ci-shipping-badge {
          font-size: 0.8rem;
          color: #7daa6f;
          margin-bottom: 1.25rem;
        }

        /* Summary lines */
        .ci-summary__lines {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }
        .ci-summary__line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: rgba(240,230,211,0.6);
        }
        .ci-summary__line--total {
          font-size: 1rem;
          font-weight: 500;
          color: #f0e6d3;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(125,170,111,0.12);
        }
        .ci-summary__line--total dd {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: #d4b483;
        }
        .ci-free { color: #7daa6f; }

        /* Buttons */
        .ci-btn {
          display: block;
          width: 100%;
          padding: 0.85rem 1rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .ci-btn--checkout {
          background: #4a7c3f;
          color: #f0e6d3;
          border: 1px solid #4a7c3f;
        }
        .ci-btn--checkout:hover {
          background: #7daa6f;
          border-color: #7daa6f;
        }
        .ci-btn--continue {
          background: transparent;
          color: rgba(240,230,211,0.55);
          border: 1px solid rgba(125,170,111,0.2);
        }
        .ci-btn--continue:hover {
          border-color: rgba(125,170,111,0.45);
          color: #f0e6d3;
        }

        /* Trust badges */
        .ci-trust {
          list-style: none;
          padding: 0;
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .ci-trust li {
          font-size: 0.75rem;
          color: rgba(240,230,211,0.3);
          letter-spacing: 0.05em;
        }

        /* ── Empty cart ── */
        .ci-empty {
          max-width: 480px;
          margin: 6rem auto;
          text-align: center;
          padding: 0 2rem;
        }
        .ci-empty__icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.4;
        }
        .ci-empty__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #f0e6d3;
          margin-bottom: 0.75rem;
        }
        .ci-empty__sub {
          font-size: 0.9rem;
          line-height: 1.75;
          color: rgba(240,230,211,0.45);
          margin-bottom: 2rem;
        }

        /* ── Responsive row ── */
        @media (max-width: 700px) {
          .ci-row {
            grid-template-columns: 72px 1fr auto;
            grid-template-rows: auto auto auto;
          }
          .ci-row__img-wrap { width: 72px; height: 72px; grid-row: 1 / 3; }
          .ci-row__info     { grid-column: 2 / 4; }
          .ci-row__qty      { grid-column: 2; grid-row: 2; }
          .ci-row__line-total { grid-column: 3; grid-row: 2; }
          .ci-row__remove   { grid-column: 3; grid-row: 1; align-self: start; }
        }
      `}</style>

      <div className="ci-page">
        {/* ── Header ── */}
        <header className="ci-header">
          <p className="ci-header__eyebrow">Paradise Nursery · Shopping</p>
          <h1 className="ci-header__title">
            Your <em>Cart</em>
          </h1>
          {cartCount > 0 && (
            <p className="ci-header__count">
              {cartCount} {cartCount === 1 ? "item" : "items"} ready for checkout
            </p>
          )}
        </header>

        {cartItems.length === 0 ? (
          /* ── Empty state ── */
          <EmptyCart onContinueShopping={handleContinue} />
        ) : (
          /* ── Cart layout ── */
          <div className="ci-layout">
            {/* Left: item list */}
            <section aria-label="Cart items">
              <ul className="ci-list">
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    onUpdateQty={handleUpdateQty}
                  />
                ))}
              </ul>
            </section>

            {/* Right: order summary */}
            <OrderSummary
              subtotal={cartTotal}
              onContinueShopping={handleContinue}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </>
  );
}
