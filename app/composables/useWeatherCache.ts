
export const useWeatherCache = () => {
  const store = useState<Record<string, number | null>>('weather-cache', () => ({})) // globaler Cache 
  const loading = useState<Record<string, boolean>>('weather-loading', () => ({}))   // Ladesignale je Key 

  const keyOf = (lat: number, lon: number, day: string) => `${lat.toFixed(3)},${lon.toFixed(3)}:${day}`

  const getDailyMean = async (lat: number, lon: number, day: string) => {
    const k = keyOf(lat, lon, day)
    if (k in store.value) return { temp: store.value[k], fromCache: true }          // Cache‑Hit 
    loading.value[k] = true
    try {
      const { temp } = await $fetch<{ temp?: number; error?: string }>('/api/weather', { // API‑Abruf 
        query: { lat, lon, date: day }
      })
      store.value[k] = typeof temp === 'number' ? temp : null
      return { temp: store.value[k], fromCache: false }
    } finally {
      loading.value[k] = false
    }
  }

  const isLoading = (lat: number, lon: number, day: string) => {
    const k = keyOf(lat, lon, day)
    return !!loading.value[k]
  }

  return { getDailyMean, isLoading }
}
