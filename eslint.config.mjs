import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // 1) Lint-Zielmuster definieren (auch future-proof für JS/MJS)
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx,vue}"],
  },
  // 2) Globale Ignores (nur dieses Objekt, keine weiteren Keys)
  {
    ignores: [
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/dist/**",
      "**/coverage/**",
    ],
  }
);
