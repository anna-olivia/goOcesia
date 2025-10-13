// scripts/build-capitals.mjs
import fs from 'node:fs/promises'                     // Dateisystem (Promises API) [web:257]
import countries from 'world-countries'               // Länder + Hauptstädte (ohne Koordinaten) [web:241]

// Node 18+ hat fetch global; bei älteren Versionen ggf. 'node-fetch' verwenden [web:303][web:311]

async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en` // [web:93]
  const res = await fetch(url)                         // HTTP-Request via Fetch API [web:303]
  const data = await res.json()
  const hit = data?.results?.[0]
  return hit ? { lat: hit.latitude, lon: hit.longitude } : null
}

const out = []                                        // Ergebnisliste [{country, capital, lat, lon}]
for (const c of countries) {                          // Iteration über alle Länder [web:241]
  const country = c?.name?.common
  const capital = Array.isArray(c?.capital) ? c.capital[0] : c?.capital
  if (!country || !capital) continue
  const coords = await geocode(capital)               // Koordinaten per Geocoding [web:93]
  if (coords) out.push({ country, capital, lat: coords.lat, lon: coords.lon })
  await new Promise(r => setTimeout(r, 80))           // leichte Drosselung gegen Rate-Limits [web:93]
}

await fs.mkdir('app/assets/data', { recursive: true }) // Zielordner anlegen (rekursiv) [web:257]
await fs.writeFile('app/assets/data/capitals.json', JSON.stringify(out, null, 2), 'utf-8') // Datei schreiben [web:257]
console.log(`Wrote ${out.length} capitals`)
