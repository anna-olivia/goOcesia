import { defineEventHandler, getQuery } from "h3";

interface WeatherResponse {
  temp?: number;
  error?: string;
}

function isISODate(s?: string): s is string {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export default defineEventHandler(async (event): Promise<WeatherResponse> => {
  const { lat, lon, date } = getQuery(event) as {
    lat?: string;
    lon?: string;
    date?: string;
  };

  if (!lat || !lon) return { error: "lat and lon required" };

  const latitude = Number(lat);
  const longitude = Number(lon);
  if (Number.isNaN(latitude) || Number.isNaN(longitude))
    return { error: "invalid lat/lon" };

  // Datum bestimmen
  const today = new Date().toISOString().slice(0, 10);
  const day = isISODate(date) ? date : today;

  try {
    if (day === today) {
      // Heutige Temperatur (Forecast)
      // Variante A: current_weather=true
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
      const data = await $fetch<any>(url);
      const temp = data?.current_weather?.temperature;
      // Fallback: letzte Stunde, falls current_weather fehlt
      if (typeof temp === "number") return { temp };
      const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=auto`;
      const data2 = await $fetch<any>(url2);
      const temps = data2?.hourly?.temperature_2m as number[] | undefined;
      return {
        temp:
          Array.isArray(temps) && temps.length
            ? temps[temps.length - 1]
            : undefined,
      };
    } else {
      // Historisch: Tagesmittel
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${day}&end_date=${day}&daily=temperature_2m_mean&timezone=auto`;
      const data = await $fetch<any>(url);
      const temp = data?.daily?.temperature_2m_mean?.[0];
      return { temp };
    }
  } catch (e: any) {
    return { error: e?.message || "fetch failed" };
  }
});
