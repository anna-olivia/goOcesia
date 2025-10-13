<script setup lang="ts">
import { computed, ref } from "vue";
import { geoMercator, geoPath } from "d3-geo";

// geojson wird zu topojson konvertiert
import type {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
} from "geojson";
// für svg
import { feature } from "topojson-client";
type CountryFeature = Feature<Geometry, { name?: string }>;
type Coords = { lat: number; lon: number };

/* type Tooltip = { x: number; y: number; temp?: number | null; capital?: string; season?: 'Sommermonat' | 'Wintermonat' } */
type CapitalTemp = {
  country: string;
  capital: string;
  lat: number;
  lon: number;
  date: string;
  temp?: number | null;
};

// 1. viewbox canva
const width = 1000;
const height = 520;

// 2. api aufruf länder laden mit status und fehler
const { data: countriesData, status: countriesStatus } = await useAsyncData(
  "countries-110m",
  async () => {
    const world = await import("world-atlas/countries-110m.json");
    const topology: Record<string, unknown> =
      (world as { default?: Record<string, unknown> }).default || world;

    const topo =
      topology as unknown as import("topojson-specification").Topology;
    const countriesObj = topo.objects && topo.objects.countries;
    if (!countriesObj) {
      throw new Error("Topology does not contain 'countries' object");
    }
    const raw = feature(topo, countriesObj);

    if (!("features" in raw)) {
      throw new Error("expected FeatureCollection with 'features' property");
    }

    return raw as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
  },
  { server: false, lazy: true }
);

const countries = computed<FeatureCollection<
  Geometry,
  GeoJsonProperties
> | null>(() => countriesData.value ?? null);

//3. SSR Hauptstädte vorladen
const { data: capitalTemps, status: tempsStatus } = await useAsyncData(
  "capitals-temps",
  () => $fetch<CapitalTemp[]>("/api/capital-temps")
);

// Index: Land -> CapitalTemp
const tempByCountry = computed(() => {
  const m = new Map<string, CapitalTemp>();
  for (const c of capitalTemps.value || []) m.set(c.country, c);
  return m;
});

// 4. State, reaktivität

const hoveredId = ref<string | null>(null);
/* const selectedCountryName = ref<string | null>(null)
const selectedCapital = ref<string | null>(null)
const selectedCoords = ref<Coords | null>(null)
const tooltip = ref<Tooltip | null>(null) */
const hoveredName = ref<string | null>(null);
const tooltip = ref<{ x: number; y: number } | null>(null);

//5. InfoKarte
const showCard = ref(false);
const selectedCountryName = ref<string | null>(null);
const selectedCapital = ref<string | null>(null);
const selectedCoords = ref<Coords | null>(null);
const initialTemp2025 = ref<number | null | undefined>(null);

// 6. Zeitstrahl mit reaktiver Reference auf Jahreszahl
const ticks = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025];
const year = ref<number>(2025);

// 7. projektion und pfadgenrator

const projection = geoMercator().fitSize([width, height], { type: "Sphere" });
// wird auf viewport angepasst

projection.scale(projection.scale() * 1.7); // etwas vergrößern
const pathGen = geoPath(projection);
// weitere anpassung beim svg path + scalen der länder
// eventuell später zoom einbauen

// 8. Events: Hover-Tooltip nur mit Ländernamen
const onMouseMove = (evt: MouseEvent) => {
  if (!tooltip.value) {
    tooltip.value = { x: 0, y: 0 };
  }
  tooltip.value.x = evt.offsetX + 12;
  tooltip.value.y = evt.offsetY + 12;
};
const onEnter = (f: CountryFeature) => {
  hoveredId.value =
    (f.id as string | null | undefined) || f.properties?.name || "";
  hoveredName.value = f.properties?.name || null;
};
const onLeave = () => {
  hoveredId.value = null;
  hoveredName.value = null;
  tooltip.value = null;
};

// Klick-Event: Card öffnen, sofortige 2025-Werte aus SSR-Index
const onClick = (f: CountryFeature, _evt: MouseEvent) => {
  const name = f.properties?.name;
  if (!name) return;
  selectedCountryName.value = name;

  const hit = tempByCountry.value.get(name);
  if (hit) {
    selectedCapital.value = hit.capital;
    selectedCoords.value = { lat: hit.lat, lon: hit.lon };
    initialTemp2025.value = hit.temp ?? null;
  } else {
    // Ohne SSR-Hit nur Name setzen; die Card lädt dann on-demand (z. B. heute oder gewähltes Jahr)
    selectedCapital.value = null;
    selectedCoords.value = null;
    initialTemp2025.value = null;
  }

  // Tooltip verstecken und Karte öffnen
  hoveredName.value = null;
  tooltip.value = null;
  showCard.value = true;
};

// Card schließen (wird von der Card-Komponente ausgelöst)
const onCloseCard = () => {
  showCard.value = false;
};
</script>

<template>
  <div class="relative container mx-auto" @mousemove="onMouseMove">
    <!-- Zeitstrahl (gesteuert in der Card) -->
    <div class="m-4">
      <div
        id="badge"
        class="text-xs font-inter mt-1 text-white font-bold bg-orange-400 p-1 w-14 text-center rounded"
      >
        {{ year }}
      </div>
      <input
        v-model.number="year"
        type="range"
        :min="ticks[0]"
        :max="ticks[ticks.length - 1]"
        step="5"
        class="w-full accent-emerald-500"
      />
      <!-- v-model.number damit nicht string entsteht weil inpute range also ein html inpur werte als strings zurückgeben - eventuell noch computed ablleiten -->
    </div>
    <!-- Overlay-Spinner Länder -->
    <div
      v-if="countriesStatus === 'pending'"
      class="absolute inset-0 grid place-items-center"
    >
      <div
        class="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
      />
    </div>

    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto">
      <defs>
        <clipPath id="sphere">
          <path :d="pathGen({ type: 'Sphere' } as any) as string" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" class="fill-sky-50" />

      <g v-if="countries" clip-path="url(#sphere)">
        <path
          v-for="f in countries.features"
          :key="(f.id as any) || f.properties?.name"
          :d="pathGen(f as any) || ''"
          class="fill-zinc-200 stroke-white hover:fill-emerald-300 transition"
          :class="[(hoveredId === ((f.id as any) || f.properties?.name)) ? 'fill-emerald-300' : '']"
          @mouseenter="onEnter(f as any)"
          @mouseleave="onLeave"
          @click="onClick(f as any, $event)"
        />
      </g>
    </svg>

    <!-- Hover-Tooltip: nur Ländername -->
    <div
      v-if="tooltip && hoveredName"
      class="absolute bg-white/95 shadow rounded px-2 py-1 text-xs font-inter"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      {{ hoveredName }}
    </div>

    <!-- Detail-Karteikarte als Overlay -->
    <CountryInfoCard
      v-if="showCard"
      :year="year"
      :loading-ssr="tempsStatus === 'pending'"
      :country="selectedCountryName"
      :capital="selectedCapital"
      :coords="selectedCoords"
      :initial-temp-2025="initialTemp2025"
      @close="onCloseCard"
    />
  </div>
</template>
