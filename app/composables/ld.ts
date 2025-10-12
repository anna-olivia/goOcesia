import type { WithContext, WebPage } from "schema-dts";

export const webpageLd = (url: string, name: string): WithContext<WebPage> => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  url,
  name,
});
