import fs from "node:fs/promises"; // Dateisystem (Promises API)
import countries from "world-countries"; // Länder + Hauptstädte (ohne Koordinaten)

async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en`;
  const res = await fetch(url);
  const data = await res.json();
  const hit = data?.results?.[0];
  return hit ? { lat: hit.latitude, lon: hit.longitude } : null;
}

const out = []; // Ergebnisliste [{country, capital, lat, lon}]
for (const c of countries) {
  // Iteration über alle Länder
  const country = c?.name?.common;
  const capital = Array.isArray(c?.capital) ? c.capital[0] : c?.capital;
  if (!country || !capital) continue;
  const coords = await geocode(capital); // Koordinaten per Geocoding
  if (coords) out.push({ country, capital, lat: coords.lat, lon: coords.lon });
  await new Promise((r) => setTimeout(r, 80)); // leichte Drosselung gegen Rate-Limits
}

await fs.mkdir("app/assets/data", { recursive: true }); // Zielordner anlegen (rekursiv) [web:257]
await fs.writeFile(
  "app/assets/data/capitals.json",
  JSON.stringify(out, null, 2),
  "utf-8"
); // Datei schreiben
console.log(`Wrote ${out.length} capitals`);
