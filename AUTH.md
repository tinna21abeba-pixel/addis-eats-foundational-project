# Addis Eats - Authentication & Authorization Architecture

## Route Protection Layers

### `/menu`
- Public: Open access for all visitors, fully indexable.

### `/orders`
- middleware -> Cookie exists (`ae_session`). Unauthenticated users are redirected to `/signin?next=/orders`.
- page -> Session verified via `getSession()`. Invalid or forged signatures redirect to sign-in.
- query -> Scoped to `getOrdersFor(session.userId)`. Orders for other accounts are never queried.
- action -> Ownership re-checked in `cancelOrder` before mutation.

### `/checkout`
- middleware -> Cookie exists (`ae_session`). Redirects unauthenticated users to `/signin?next=/checkout`.
- page -> Session verified via `getSession()`.
- write operation -> Server action `placeOrder` validates input schema and associates order with verified session user ID.

### `/kitchen`
- middleware -> Cookie exists (`ae_session`). Redirects unauthenticated users to `/signin?next=/kitchen`.
- page -> Role check enforces `session.role === "kitchen"`. Customer sessions receive access denied response.
- action -> `updateOrderStatusAction` verifies `session.role === "kitchen"` before updating status.

### `/signin`
- middleware -> Prevents open redirect attacks by sanitizing the `next` destination URL.

---

## Action Protection Layers

### `placeOrder`
- Validates payload against Zod `orderSchema`.
- Confirms dish IDs exist in store.
- Requires or provisions signed session cookie.

### `cancelOrder`
- Checks active authenticated session.
- Validates order existence in store.
- Enforces strict ownership check (`order.userId === session.userId`).
- Verifies order is in pending status.

### `updateOrderStatusAction`
- Checks active authenticated session.
- Enforces kitchen role requirement (`session.role === "kitchen"`).
- Updates database state and revalidates paths.

---

## Verification of the Three Attacks

### Attack 1: Signed Out Cancellation
- Command: `await cancelOrder("ORD-1001")`
- Expected: Refused (401 UNAUTHENTICATED)
- Enforcement Point: `app/lib/orders.js:37` (`if (!session)`)
- Outcome: Request blocked.

### Attack 2: Cross-Account Cancellation (Signed in as someone else)
- Command: `await cancelOrder("ORD-9999")`
- Expected: Refused on ownership (403 FORBIDDEN)
- Enforcement Point: `app/lib/orders.js:46` (`if (order.userId !== session.userId)`)
- Outcome: Request blocked.

### Attack 3: Open Redirect via Crafted Sign-In Link
- URL: `/signin?next=https://example.com`
- Expected: Lands on `/`, not away
- Enforcement Point: `middleware.js:3` and `app/actions.js:8` (`sanitizeNext(next)`)
- Outcome: Protocol and absolute URLs rejected; redirects safely to `/`.
