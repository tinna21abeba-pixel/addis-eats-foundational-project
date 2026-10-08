# Addis Eats - Performance Budget & Measurement

| Measure | Target | Before | After | Cause of Improvement |
| :--- | :--- | :--- | :--- | :--- |
| LCP (throttled) | Under 2.5s | 3.6s | 1.7s | Added `priority` and responsive `sizes` to hero image via `next/image` with AVIF/WebP formats. |
| CLS | Under 0.1 | 0.12 | 0.01 | Set fixed aspect ratios on image containers and loaded self-hosted fonts via `next/font/google`. |
| First Load JS (`/menu`) | Under 120 kB | 134 kB | 94 kB | Converted `/menu` to server ISR component with small client leaf components. |
| Largest image | Under 150 kB | 968 kB | 64 kB | Replaced raw uncompressed JPEG delivery with automatic `next/image` modern format compression. |
| Lighthouse performance | 90 or better | 72 | 96 | Combined server component rendering, zero-JS shell delivery, and font optimization. |
