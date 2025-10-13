// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true, // serverseitiges Rendering für crawlbares HTML
  app: {
    head: {
      htmlAttrs: { lang: "de" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "title", content: "Ocesia - global temperatures on one click" },
        { name: "description", content: "Interactive Worldmap with timeline" },
        { name: "author", content: "Anna-Olivia Lebert-Wietholtz" },
      ],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-schema-org",
    "@dargmuesli/nuxt-cookie-control",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  typescript: {
    typeCheck: true,
  },
  css: ["~/assets/css/tailwind.css"],

  icon: {
    serverBundle: {
      collections: ["uil", "mdi"],
    },
  },

  runtimeConfig: {
    demoUserEmail: process.env.NUXT_DEMO_USER_EMAIL,
    demoUserPassword: process.env.NUXT_DEMO_USER_PASSWORD,
    ecoUserEmail: process.env.NUXT_ECO_USER_EMAIL,
    ecoUserPassword: process.env.NUXT_ECO_USER_PASSWORD,

    public: {
      siteUrl: "https://example.com",
    },
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Example GmbH",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
    },
  },

  cookieControl: {
    locales: ["de"],
    cookies: {
      necessary: [],
      optional: [
        {
          id: "ga4",
          name: { de: "Google Analytics" },
          description: { de: "Nutzungsanalyse, anonymisiert." },
          targetCookieIds: ["_ga", "_ga_*"],
          src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX",
          isPreselected: false,
        },
      ],
    },
  },
  robots: {
    disallow: ["/map"],
  },
  site: {
    url: "https://example.com",
    name: "Example",
  },
  sitemap: {
    autoLastmod: true,
  },
});
