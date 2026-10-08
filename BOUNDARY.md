# Addis Eats - Server and Client Boundary

| Component / File | Boundary | Purpose |
| :--- | :--- | :--- |
| `app/layout.js` | Server | Root layout shell, injects font variables and metadata, passes children into providers. |
| `app/page.js` | Server | Static landing hero and featured dish sections rendered directly on server. |
| `app/Providers.jsx` | Client | Context provider wrapper holding cart client state across routes. |
| `app/components/Header.jsx` | Client | Reads cart badge count and handles responsive navigation toggles. |
| `app/components/Footer.jsx` | Server | Static footer links and legal markup. |
| `app/menu/page.js` | Server | Awaits dish catalog from server store and passes seed data to explorer. |
| `app/menu/layout.js` | Server | Wraps menu routes with static sidebar navigation. |
| `app/menu/MenuSidebar.jsx` | Server | Renders dish navigation links on server. |
| `app/menu/MenuCounter.jsx` | Client | Isolated leaf holding client demonstration counter state. |
| `app/menu/MenuExplorer.jsx` | Client | Leaf component managing debounced search input, category filter, and display. |
| `app/menu/AddToCartButton.jsx` | Client | Leaf component handling onClick event and writing items to CartContext store. |
| `app/menu/[id]/page.js` | Server | Generates static params, metadata, JSON-LD, and renders dish view. |
| `app/cart/page.js` | Server | Shell layout container for cart display. |
| `app/cart/CartView.jsx` | Client | Interacts with cart store, line item removal, and subtotal calculation. |
| `app/checkout/page.js` | Server | Verifies active session on server before rendering checkout interface. |
| `app/checkout/CheckoutForm.jsx` | Client | Form state handling with useActionState, clearing cart on success. |
| `app/orders/page.js` | Server | Verifies session, queries scoped orders, and seeds initial data. |
| `app/orders/OrdersList.jsx` | Client | Displays seeded orders without initial spinner and polls status updates. |
| `app/orders/CancelOrderButton.jsx` | Client | Form submission for order cancellation with useActionState. |
| `app/kitchen/page.js` | Server | Enforces kitchen staff role check and reads order queue. |
| `app/kitchen/KitchenBoard.jsx` | Client | Allows kitchen staff to trigger status transitions via server actions. |
| `app/signin/page.js` | Server | Renders sign-in shell with Suspense boundary. |
| `app/signin/SignInForm.jsx` | Client | Interactive sign-in form and role-selection triggers. |
