import { defineEventHandler } from 'h3' 
// nitro
import capitals from '~/assets/data/capitals.json' assert { type: 'json' }

type Capital = { country: string; capital: string; lat: number; lon: number }
type CapitalTemp = { country: string; capital: string; lat: number; lon: number; date: string; temp?: number }

let cache: { date: string; data: CapitalTemp[] } | null = null // in-memory Cache 

export default defineEventHandler(async (): Promise<CapitalTemp[]> => {
  const date = '2025-07-15' // Referenzdatum 
  if (cache && cache.date === date) return cache.data // schneller Cache‑Treffer 

  // Listen für Mehrkoordinaten-Abfrage zusammenstellen, ggf. in Batches splitten 
  const batchSize = 200
  const results: CapitalTemp[] = []

  for (let i = 0; i < capitals.length; i += batchSize) {
    const slice = (capitals as Capital[]).slice(i, i + batchSize)
    const latList = slice.map(c => c.lat).join(',')
    const lonList = slice.map(c => c.lon).join(',')
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latList}&longitude=${lonList}&start_date=${date}&end_date=${date}&daily=temperature_2m_mean&timezone=UTC` // Mehrkoordinaten, daily mean 

    const data = await $fetch<any>(url) // JSON: Liste von Standorten in gleicher Reihenfolge 
    const locations = Array.isArray(data) ? data : data?.locations // API gibt Array je Standort 

    // Pro Standort den Tageswert anreichern
    slice.forEach((cap, idx) => {
      // Kompatibel zu Array- oder Objektform
      const loc = Array.isArray(locations) ? locations[idx] : locations?.[idx]
      const t = loc?.daily?.temperature_2m_mean?.[0]
      results.push({ ...cap, date, temp: typeof t === 'number' ? t : undefined })
    })
  }

  cache = { date, data: results } // zwischenspeichern 
  return results
})
