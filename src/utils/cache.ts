import type { ClimateData, CacheEntry } from "../types/weather";

const CACHE_PREFIX = "weather_";
const MAX_ENTRIES = 5;
const TTL_MS = 24 * 60 * 60 * 1000; // 24時間

function cacheKey(cityId: string, periodKey: string): string {
  return `${CACHE_PREFIX}${cityId}_${periodKey}`;
}

function getAllCacheKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(CACHE_PREFIX)) {
      keys.push(k);
    }
  }
  return keys;
}

export function getCachedData(cityId: string, periodKey: string): ClimateData | null {
  const key = cacheKey(cityId, periodKey);
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function setCachedData(cityId: string, periodKey: string, data: ClimateData): void {
  evictOldest();

  const key = cacheKey(cityId, periodKey);
  const entry: CacheEntry = {
    cityId,
    period: periodKey,
    data,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage容量超過時は無視
  }
}

function evictOldest(): void {
  const keys = getAllCacheKeys();
  if (keys.length < MAX_ENTRIES) return;

  let oldestKey = keys[0];
  let oldestTime = Infinity;

  for (const k of keys) {
    try {
      const entry: CacheEntry = JSON.parse(localStorage.getItem(k)!);
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = k;
      }
    } catch {
      localStorage.removeItem(k);
      return;
    }
  }

  localStorage.removeItem(oldestKey);
}