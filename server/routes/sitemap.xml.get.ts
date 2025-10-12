export default defineEventHandler(() => {
  const base = "https://notsetyet";
  const urls = [
    { loc: `${base}/`, lastmod: "2025-10-15" },
    { loc: `${base}/en/map`, lastmod: "2025-10-10" },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`
      )
      .join("")}
  </urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
});
