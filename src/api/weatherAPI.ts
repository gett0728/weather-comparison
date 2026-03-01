import type { City } from "../types/city";
import type { ClimateData, MonthlyStats, Period } from "../types/weather";
import { periodToStartDate, periodToEndDate } from "../utils/dateUtils";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const TIMEOUT_MS = 10000;

const DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "temperature_2m_mean",
  "precipitation_sum",
  "sunshine_duration",
  "wind_speed_10m_max",
  "relative_humidity_2m_mean",
  "weather_code"
].join(",");

interface RawDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature_2m_mean: number[];
  precipitation_sum: number[];
  sunshine_duration: number[];
  wind_speed_10m_max: number[];
  relative_humidity_2m_mean: number[];
  weather_code: number[];
}

interface RawResponse {
  daily: RawDaily;
}

/**
 * Open-Meteo API からデータ取得→月別集計→ClimateData を返す
 */
export async function fetchClimateData(city: City, period: Period): Promise<ClimateData> {
  const startDate = periodToStartDate(period);
  const endDate = periodToEndDate(period);

  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    daily: DAILY_PARAMS,
    start_date: startDate,
    end_date: endDate,
    timezone: "Asia/Tokyo"
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const url = `${BASE_URL}?${params}`;
    console.log(`[Weather API] Request URL: ${url}`);
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const json: RawResponse = await res.json();
    const monthlyStats = aggregateMonthly(json.daily);

    return {
      cityId: city.id,
      cityName: city.name,
      prefecture: city.prefecture,
      monthlyStats,
      period: { start: startDate, end: endDate }
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 日別データを年-月ごとに集計
 */
function aggregateMonthly(daily: RawDaily): MonthlyStats[] {
  // 年-月キーごとにインデックスをグループ化
  const groups = new Map<string, number[]>();

  for (let i = 0; i < daily.time.length; i++) {
    const d = new Date(daily.time[i]);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    const list = groups.get(key) ?? [];
    list.push(i);
    groups.set(key, list);
  }

  const results: MonthlyStats[] = [];

  for (const [key, indices] of groups) {
    const [yearStr, monthStr] = key.split("-");
    const n = indices.length;

    const avgTemp = avg(indices.map(i => daily.temperature_2m_mean[i]));
    const maxTemp = avg(indices.map(i => daily.temperature_2m_max[i]));
    const minTemp = avg(indices.map(i => daily.temperature_2m_min[i]));
    const totalSunshine = sum(indices.map(i => daily.sunshine_duration[i])) / 3600; // 秒→時間
    const totalPrecipitation = sum(indices.map(i => daily.precipitation_sum[i]));
    const avgHumidity = avg(indices.map(i => daily.relative_humidity_2m_mean[i]));
    const avgWindSpeed = avg(indices.map(i => daily.wind_speed_10m_max[i]));

    // 天気コード分類
    let sunnyDays = 0;
    let cloudyDays = 0;
    let rainyDays = 0;
    for (const i of indices) {
      const code = daily.weather_code[i];
      if (code <= 1) {
        sunnyDays++;
      } else if (code <= 3 || code === 45 || code === 48) {
        cloudyDays++;
      } else {
        rainyDays++;
      }
    }

    results.push({
      year: Number(yearStr),
      month: Number(monthStr),
      avgTemp: round1(avgTemp),
      maxTemp: round1(maxTemp),
      minTemp: round1(minTemp),
      totalSunshine: round1(totalSunshine),
      totalPrecipitation: round1(totalPrecipitation),
      avgHumidity: round1(avgHumidity),
      avgWindSpeed: round1(avgWindSpeed),
      sunnyDays,
      cloudyDays,
      rainyDays
    });
  }

  // 年月順でソート
  results.sort((a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month);
  return results;
}

function avg(arr: number[]): number {
  return arr.length === 0 ? 0 : arr.reduce((s, v) => s + v, 0) / arr.length;
}

function sum(arr: number[]): number {
  return arr.reduce((s, v) => s + v, 0);
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}