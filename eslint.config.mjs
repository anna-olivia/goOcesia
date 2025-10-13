import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx,vue}"],
  },
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
