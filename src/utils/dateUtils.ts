import type { Period } from "../types/weather";

/**
 * Period から API用の開始日文字列を返す
 */
export function periodToStartDate(period: Period): string {
  const month = String(period.startMonth).padStart(2, "0");
  return `${period.startYear}-${month}-01`;
}

/**
 * Period から API用の終了日文字列を返す（月末日）
 */
export function periodToEndDate(period: Period): string {
  const lastDay = new Date(period.endYear, period.endMonth, 0).getDate();
  const month = String(period.endMonth).padStart(2, "0");
  return `${period.endYear}-${month}-${String(lastDay).padStart(2, "0")}`;
}

/**
 * Period を "YYYY-MM_YYYY-MM" 形式のキーに変換
 */
export function periodToKey(period: Period): string {
  const sm = String(period.startMonth).padStart(2, "0");
  const em = String(period.endMonth).padStart(2, "0");
  return `${period.startYear}-${sm}_${period.endYear}-${em}`;
}

/**
 * 開始日が終了日より前かを検証
 */
export function isValidPeriod(period: Period): boolean {
  if (period.startYear < period.endYear) return true;
  if (period.startYear === period.endYear) return period.startMonth <= period.endMonth;
  return false;
}

/**
 * 現在から過去2年間の選択肢用 年月リストを生成
 */
export function generateYearMonthOptions(): { year: number; month: number; label: string }[] {
  const options: { year: number; month: number; label: string }[] = [];
  const now = new Date();
  now.setDate(1);
  now.setMonth(now.getMonth() - 1);
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  let offset = 240 + currentMonth - 1; // 20年分の月数 + 今月オフセット
  for (offset; offset >= 0; offset--) {
    let y = currentYear;
    let m = currentMonth - offset;
    while (m <= 0) { m += 12; y--; }
    options.push({ year: y, month: m, label: `${y}年${m}月` });
  }
  return options;
}

/**
 * 過去365日分のデフォルトPeriodを返す
 */
export function getDefaultPeriod(): Period {
  const now = new Date();
  now.setDate(1);
  now.setMonth(now.getMonth() - 1);

  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return {
    startYear: oneYearAgo.getFullYear(),
    startMonth: oneYearAgo.getMonth() + 1,
    endYear: now.getFullYear(),
    endMonth: now.getMonth()
  };
}