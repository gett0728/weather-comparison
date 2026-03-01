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
 * 現在から過去2年間の選択肢用年月リストを生成
 */
export function generateYearMonthOptions(): { year: number; month: number; label: string }[] {
  const options: { year: number; month: number; label: string }[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let offset = 240 + currentMonth - 1; // 20年分の月数 + 今月オフセット
  for (offset; offset >= 0; offset--) {
    let year = currentYear;
    let month = currentMonth - offset;
    while (month <= 0) { month += 12; year--; }
    options.push({ year: year, month: month, label: `${year}年${month}月` });
  }

  return options;
}

/**
 * 過去365日分のデフォルトPeriodを返す
 */
export function getDefaultPeriod(): Period {
  const now = new Date();
  const startDate = new Date(now.getFullYear() - 1, now.getMonth()); // start: 当月から1年前
  const endDate = new Date(now.getFullYear(), now.getMonth() - 1); // end: 当月の前月

  return {
    startYear: startDate.getFullYear(),
    startMonth: startDate.getMonth() + 1, // getMonthは月を0-11で返すため+1
    endYear: endDate.getFullYear(),
    endMonth: endDate.getMonth() + 1 // getMonthは月を0-11で返すため+1
  };
}