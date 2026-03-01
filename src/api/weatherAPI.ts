import type { City } from "../types/city";
import type { ClimateData, MonthlyStats, Period } from "../types/weather";
import { periodToStartDate, periodToEndDate } from "../utils/dateUtils";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_BASE_URL = "https://archive-api.open-meteo.com/v1/archive";
const TIMEOUT_MS = 10000;
const FORECAST_MAX_PAST_DAYS = 92;

/** Forecast API 用日次パラメータ（temperature_2m_mean, relative_humidity_2m_mean あり） */
const FORECAST_DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "temperature_2m_mean",
  "precipitation_sum",
  "sunshine_duration",
  "wind_speed_10m_max",
  "relative_humidity_2m_mean",
  "weather_code"
].join(",");

/** Archive API 用日次パラメータ（mean気温・湿度は日次パラメータに存在しない） */
const ARCHIVE_DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
  "sunshine_duration",
  "wind_speed_10m_max",
  "weather_code"
].join(",");

/**
 * 開始日が Forecast API の範囲（過去92日以内）を超えるか判定
 */
function needsArchiveApi(startDate: string): boolean {
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - start.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > FORECAST_MAX_PAST_DAYS;
}

interface RawDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature_2m_mean?: number[];           // Archive API では取得不可
  precipitation_sum: number[];
  sunshine_duration: number[];
  wind_speed_10m_max: number[];
  relative_humidity_2m_mean?: number[];     // Archive API では取得不可
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

  const useArchive = needsArchiveApi(startDate);
  const baseUrl = useArchive ? ARCHIVE_BASE_URL : FORECAST_BASE_URL;
  const dailyParams = useArchive ? ARCHIVE_DAILY_PARAMS : FORECAST_DAILY_PARAMS;

  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    daily: dailyParams,
    start_date: startDate,
    end_date: endDate,
    timezone: "Asia/Tokyo"
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const url = `${baseUrl}?${params}`;
    console.log(`[Weather API] ${useArchive ? "Archive" : "Forecast"} Request URL: ${url}`);
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

    const maxTemp = avg(indices.map(i => daily.temperature_2m_max[i]));
    const minTemp = avg(indices.map(i => daily.temperature_2m_min[i]));
    // temperature_2m_mean は Archive API に存在しないため (max + min) / 2 でフォールバック
    const avgTemp = daily.temperature_2m_mean
      ? avg(indices.map(i => daily.temperature_2m_mean![i]))
      : round1((maxTemp + minTemp) / 2);
    const totalSunshine = sum(indices.map(i => daily.sunshine_duration[i])) / 3600; // 秒→時間
    const totalPrecipitation = sum(indices.map(i => daily.precipitation_sum[i]));
    // relative_humidity_2m_mean は Archive API に存在しない
    const avgHumidity = daily.relative_humidity_2m_mean
      ? avg(indices.map(i => daily.relative_humidity_2m_mean![i]))
      : NaN;
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