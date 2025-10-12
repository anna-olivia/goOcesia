<template>
  <section class="container mx-auto grid gap-10 px-4 py-20">
    <h1 class="text-4xl font-bold tracking-tide">
      Setup instructions & Details
    </h1>
    <h2 class="text-3xl text-gray-600">
      This is for nuxt version 3.29.3 with no extra module default nuxt/eslint
    </h2>
    <ol class="bg-slate-100 px-5 list-decimal">
      <li>
        <code>
          <span class="text-pink-400">$</span>npm init nuxt@latest projectname
        </code>
        <ul class="list-disc text-gray-600">
          <li>
            in ts.config.json
            <pre>
            <code>
                { 
                    // https://nuxt.com/docs/guide/concepts/typescript "files": [],
                    "references": [ { "path": "./.nuxt/tsconfig.app.json" }, { "path":
                    "./.nuxt/tsconfig.server.json" }, { "path":
                    "./.nuxt/tsconfig.shared.json" }, { "path":
                    "./.nuxt/tsconfig.node.json" } ]
                }
            </code>
            </pre>
          </li>
          <li>
            in package.json
            <pre>
            <code>
                {
                    "name": "playground",
                    "type": "module",
                    "private": true,
                    "scripts": {
                    "build": "nuxt build",
                    "dev": "nuxt dev",
                    "generate": "nuxt generate",
                    "preview": "nuxt preview",
                    "postinstall": "nuxt prepare"
                },
            "dependencies": {
                                "nuxt": "^4.1.3",
                                "vue": "^3.5.22",
                                "vue-router": "^4.5.1"
                            }
                }
            </code>
            </pre>
          </li>
          <li>
            in nuxt.config.ts
            <pre>
            <code>
           // https://nuxt.com/docs/api/configuration/nuxt-config
            export default defineNuxtConfig({
            compatibilityDate: '2025-07-15',
            devtools: { enabled: true }
            })
            </code>
            </pre>
          </li>
        </ul>
      </li>
      <li>
        <code
          ><span class="text-pink-400">$</span>npm i -D typescript vue.ts
          @nuxt/eslint vite-plugin-eslint2
        </code>
        and
        <code
          ><span class="text-pink-400">$</span>npx nuxi@latest module add
          tailwind.css</code
        >
        <ul class="list-disc text-gray-600">
          <li>
            update nuxt.config.ts
            <pre>
            <code>
             // https://nuxt.com/docs/api/configuration/nuxt-config
            export default defineNuxtConfig({
            compatibilityDate: '2025-07-15',
            devtools: { enabled: true },
            modules: [
                '@nuxt/eslint',
                '@nuxtjs/tailwindcss'
            ],
            typescript: {
            typeCheck: true
            },
            css: ['~/assets/css/tailwind.css']
        })
            </code>
            </pre>
          </li>
          <li>
            create ~/eslint.config.mjs:
            <pre>
            <code>
                import withNuxt from './.nuxt/eslint.config.mjs'
                
                export default withNuxt(
                // Lint-Zielmuster definieren (auch future-proof für JS/MJS)
                {
                    files: ['**/*.{js,cjs,mjs,ts,tsx,vue}']
                },
                // Globale Ignores (nur dieses Objekt, keine weiteren Keys)
                {
                    ignores: [
                    '**/node_modules/**',
                    '**/.nuxt/**',
                    '**/.output/**',
                    '**/dist/**',
                    '**/coverage/**'
                    ]
                }
            )
            </code>
            </pre>
          </li>
          <li>
            update package.json
            <pre>
            <code>
                {
                    "name": "playground",
                    "type": "module",
                    "private": true,
                    "scripts": {
                    "build": "nuxt build",
                    "dev": "nuxt dev",
                    "generate": "nuxt generate",
                    "preview": "nuxt preview",
                    "postinstall": "nuxt prepare",
                    "typecheck": "nuxt typecheck",
                    "lint": "eslint .",
                    "lint:fix": "eslint . --fix"
                },
                "dependencies": {
                        "nuxt": "^4.1.3",
                        "vue": "^3.5.22",
                        "vue-router": "^4.5.1"
                },
                "devDependencies": {
                "@nuxt/eslint": "^1.9.0",
                "typescript": "^5.9.3",
                "vite-plugin-eslint2": "^5.0.4",
                "vue-tsc": "^3.1.1"
            }
        }
            </code>
            </pre>
          </li>
          <li>
            create ~/app/assets/tailwind.css
            <pre>
            <code>
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
            </code>
            </pre>
          </li>
        </ul>
      </li>
      <li>
        Check VS Code Extensions - install or update
        <ul class="list-disc text-gray-600">
          <li>
            in VS Code settings.json
            <pre>
                    <code>
                        {   "editor.formatOnSave": true,
                        "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
                        "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
                        "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
                        "[vue]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
                        "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"],
                        "tailwindCSS.includeLanguages": { "vue": "html" },
                        }

                    </code>
                </pre>
          </li>
        </ul>
      </li>
    </ol>
  </section>
</template>
