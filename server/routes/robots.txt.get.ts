export default defineEventHandler(() => {
  const body = `User-agent: *
    Allow: / 
    Sitemap: https://notsetyet.com/sitemap.xml`;
  return new Response(body, {
    headers: { "Content-Type": "txt/plain; charset=utf-8" },
  });
});
