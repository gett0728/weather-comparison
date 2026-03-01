export interface MonthlyStats {
  month: number;
  year: number;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  totalSunshine: number;
  totalPrecipitation: number;
  avgHumidity: number;
  avgWindSpeed: number;
  sunnyDays: number;
  cloudyDays: number;
  rainyDays: number;
}

export interface ClimateData {
  cityId: string;
  cityName: string;
  prefecture: string;
  monthlyStats: MonthlyStats[];
  period: {
    start: string;
    end: string;
  };
}

export interface Period {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

export interface CacheEntry {
  cityId: string;
  period: string;
  data: ClimateData;
  timestamp: number;
}