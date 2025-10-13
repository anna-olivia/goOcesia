# Minimalistic World Map

A minimalist web app for displaying temperatures on an interactive world map with timeline to compare changes over the years

## Technologies

- **Frontend:** Nuxt.js 4 (Vue 3, Vite) with TypeScript
- **State management:** useState
- **Map library:** TopoJSON world-atlas and g3-geo
- **Data format:** TopoJson
- **Styling:** TailwindCSS
- **API:**Free Weather API
- **Build & Tools:** Vite, ESLint, Prettier

## Projektstruktur

```
ocesia/
│
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │    └── tailwind.css
│   │   ├── data/
│   │   │    └── capitals.json
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── BasicButton.vue
│   │   ├── CookieBanner.vue
│   │   ├── CountryInfoCard.vue
│   │   ├── LoginModal.vue
│   │   ├── SocialLinks.vue
│   │   ├── TextEcosia.vue
│   │   └── WorldMap.vue
│   ├── composables/
│   │   ├── ld.ts
│   │   ├── useAuthModel.ts
│   │   ├── useLoginModal.ts
│   │   └── useWeatherCache.ts
│   ├── layouts/
│   │   └── customLayout.vue
│   ├── middleware/
│   │   ├── auth.client.ts
│   ├── pages/
│   │   ├── index.vue
│   │   └── map.vue
│   ├──types/
│   │   └── seo.ts
│   └── app.vue
│
├── public/
│   ├── favicon.ico
│   ├── hero.png
│   └── logo.png
├── scripts/
│   └──build-capitals-from-world-countries.mjs
├── server/
│   └── api/
│      └── login.ts
├── .env.example
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

## To Do - Urgent and important

- [ ] Create roadmap for project
- [ ]EsLint problems dswg only prettier
- [ ] Adjust timeline and month in hero image
- [ ]Add tooltips and legends to the map - General info text such as what, why, etc.
- [ ] Debugging:

1. [x] Tooltip should disappear with previous data when switching to another country
       --> SSR and client combination sometimes fails - capital city sometimes does not match the country because it is stored in the cache? - only fixed by not displaying the combination in the tooltip
       [ ] Fix Antarctica, USA - no data available in capital.son why?
2. [x] Antarctica does not work -> check name match country collection
3. [x] Spinner for retrieval in client

- [x] Adjust capitals and month, not the entire country
- [x] Change scale instead of viewport - possibly adjust responsiveness - but should be more of a desktop web app
- [ ] Type error in WorldMap due to feature and feature collection - GeoJson

## To Do - Important but not urgent

- [x] Login better via modal than separate page - but modal version adjustment difficulties dswg reset for now
- [ ] Login feedback - failed
- [ ] Set months and years interactively as user and, above all, adjust zoom with d3 zoom instead of projection.scale
- [ ] Check why some countries deliver data slower than others
- [ ] Theoretical discussion of global warming and comparative data - how can a reasonable comparison be made
- [ ] Debugging: TypeError
      stack: ‘Cannot redefine property: \_path\n’ - works again after restart but may have something to do with Vite, cache, and simultaneous code updates

## To Do - Not urgent and not important

- [ ] Imprint + data protection

## Installation

1. Install dependencies:

```
npm install
```

## Start development

```
npm run dev
```

The app is then accessible at [http://localhost:3000](http://localhost:3000).

## Usage

- Interactive world map with d3-geo and GeoJSON layers for displaying countries and their average tempurature
- Styling and components based on TailwindCSS

## Resources & data sources

- GeoJSON data for climate zones can be obtained from [Natural Earth](https://www.naturalearthdata.com/), [OpenStreetMap](https://www.openstreetmap.org/), NASA, or environmental data portals, for example.

- Comparison with vector map TopoJSON with GeoJSON feature and rendered with d3-geo on SVG (no tiles) + Open-Meteo
