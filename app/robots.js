export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addiseats.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu", "/menu/*", "/cart"],
      disallow: ["/checkout", "/orders", "/orders/*", "/kitchen", "/kitchen/*", "/api/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
