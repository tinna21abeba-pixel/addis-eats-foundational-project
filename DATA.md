# Addis Eats - Data Fetching Architecture

| Data | Where | Key / Source | Refresh Rule | Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| Menu catalog | Server | `listDishes()` | ISR (`revalidate = 3600`) | Public, indexable, cacheable content shared across all users. |
| Single dish detail | Server | `findDish(id)` | Static via params | Known dish identifiers pre-rendered via `generateStaticParams`. |
| Order history | Server | `listOrdersByUser(session.userId)` | Dynamic / On request | Private user records scoped to the verified session identity. |
| Order status | Server first, then Client | `GET /api/orders` | Polled (4s interval) | Server seeds initial data with no spinner; client polls for live preparation updates. |
| Menu search | Client | `GET /api/dishes?q=...` | Debounced (300ms pause) | Triggered by user typing; debouncing prevents requests on every keystroke. |
| Shopping cart | Client | `CartContext` | In-memory client state | Local order draft that never leaves the browser until checkout submission. |
| Kitchen queue | Server | `listOrders()` | Dynamic / On request | Restricted operational data rendered on demand for kitchen staff. |
