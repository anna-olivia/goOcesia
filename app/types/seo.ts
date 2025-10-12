import { defineWebPage } from "@unhead/schema-org";

export function seoPage(name: string, description?: string) {
  return [
    defineWebPage({
      name,
      description,
    }),
  ];
}
