<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";

// Props
const props = defineProps<{
  year: number;
  loadingSsr: boolean;
  country: string | null;
  capital: string | null;
  coords: { lat: number; lon: number } | null;
  initialTemp2025: number | null | undefined;
}>();
const emit = defineEmits<{ (e: "close"): void }>();

// Client-Cache via useState (SSR-fähig)
const cache = useState<Record<string, number | null>>(
  "weather-cache",
  () => ({})
);
const loading = useState<Record<string, boolean>>(
  "weather-loading",
  () => ({})
);
const keyOf = (lat: number, lon: number, day: string) =>
  `${lat.toFixed(3)},${lon.toFixed(3)}:${day}`;

const temp = ref<number | null | undefined>(undefined);
const season = ref<"Sommermonat" | "Wintermonat" | undefined>(undefined);

// Spinner-Zustand für die aktuelle Abfrage
const isLoading = computed(() => {
  if (!props.coords) return false;
  const day = `${props.year}-07-15`;
  return !!loading.value[keyOf(props.coords.lat, props.coords.lon, day)];
});

// Saison-Helfer
const seasonForMonthAtLat = (
  month1to12: number,
  lat: number
): "Sommermonat" | "Wintermonat" => {
  const isNorth = lat >= 0;
  const northSummer = [6, 7, 8];
  const southSummer = [12, 1, 2];
  const isSummer = isNorth
    ? northSummer.includes(month1to12)
    : southSummer.includes(month1to12);
  return isSummer ? "Sommermonat" : "Wintermonat";
};

// Initial: Falls 2025 angezeigt und initialTemp vorhanden, direkt nutzen
onMounted(() => {
  if (
    props.coords &&
    props.year === 2025 &&
    props.initialTemp2025 !== undefined
  ) {
    temp.value = props.initialTemp2025 ?? null;
    season.value = seasonForMonthAtLat(7, props.coords.lat);
  }
});

// Reaktiv: Bei Jahr- oder Koordinatenwechsel nachladen (mit Cache)
watch(
  () => [props.year, props.coords] as const,
  async () => {
    if (!props.coords) return;
    const day = `${props.year}-07-15`;
    const k = keyOf(props.coords.lat, props.coords.lon, day);

    if (k in cache.value) {
      temp.value = cache.value[k];
      season.value = seasonForMonthAtLat(7, props.coords.lat);
      return;
    }

    loading.value[k] = true;
    try {
      const { temp: t } = await $fetch<{
        temp?: number | null;
        error?: string;
      }>("/api/weather", {
        query: { lat: props.coords.lat, lon: props.coords.lon, date: day },
      });
      const v = typeof t === "number" ? t : null;
      cache.value[k] = v;
      temp.value = v;
      season.value = seasonForMonthAtLat(7, props.coords.lat);
    } finally {
      loading.value[k] = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white rounded shadow-lg w-full max-w-md p-4 relative">
      <button
        class="absolute right-3 top-2 text-zinc-500 hover:text-zinc-700"
        @click="emit('close')"
      >
        ✕
      </button>
      <div class="font-inter flex justify-evenly m-5">
        <div class="font-medium">
          Land:
          <span class="text-m font-medium mb-2 text-emerald-500">
            {{ country || "Unbekanntes Land" }}</span
          >
        </div>
        <div class="font-medium">
          Hauptstadt:
          <span v-if="capital" class="text-emerald-500"> {{ capital }}</span>
        </div>
      </div>

      <!-- SSR-Referenz lädt noch -->
      <div
        v-if="loadingSsr"
        class="flex items-center gap-2 text-m text-zinc-600 font-inter"
      >
        <span>Initiale Daten werden geladen …</span>
        <span
          class="h-3 w-3 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
        />
      </div>

      <!-- Jahres-Ladevorgang -->
      <div
        v-else-if="isLoading"
        class="flex items-center gap-2 text-m font-inter"
      >
        <span>Lade Temperatur für {{ year }} …</span>
        <span
          class="h-3 w-3 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
        />
      </div>

      <!-- Anzeige -->
      <div v-else class="text-m font-inter flex justify-evenly mb-4">
        <div v-if="temp !== undefined">
          <div class="font-medium">
            Jahr: <span class="text-orange-400">{{ year }}</span>
          </div>
          <div class="font-medium">
            Temperatur (15.07.*):
            <span class="text-orange-400"
              >{{ temp === null ? "–" : Math.round(temp) + " °C" }}
            </span>
          </div>
          <div v-if="season" class="font-medium">
            Saison: <span class="text-orange-400"> {{ season }} </span>
            <br />
            <small>*fixed day for comparative reference</small>
          </div>
        </div>
        <div v-else>Keine Daten verfügbar.</div>
      </div>
    </div>
  </div>
</template>
