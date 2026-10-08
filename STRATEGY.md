# Addis Eats - Rendering Strategy

| Route | Strategy | Reason |
| :--- | :--- | :--- |
| `/` | Static (SSG) | Landing page marketing and specials are identical for all visitors. |
| `/menu` | ISR (3600s) | Dishes change a few times a day and should remain fast, cacheable, and indexable. |
| `/menu/[id]` | Static via params | Known dish IDs are pre-rendered at build time with generateStaticParams. |
| `/cart` | Static shell (Client-hydrated) | Shell is static while order item lines and totals remain in client store. |
| `/checkout` | Dynamic (Server-rendered on demand) | Protected write route reading session cookie and processing user transactions. |
| `/orders` | Dynamic (Server-rendered on demand) | Private dashboard scoped to authenticated session with live polling. |
| `/kitchen` | Dynamic (Server-rendered on demand) | Private operational board restricted to staff with kitchen role. |
| `/signin` | Dynamic (Server-rendered on demand) | Handles credentials and sanitizes destination redirect parameters. |
| `/sitemap.xml` | Static | Generated from public dish catalog; private paths are excluded. |
| `/robots.txt` | Static | Fixed crawler rules defining public indexing and private disallowed routes. |
