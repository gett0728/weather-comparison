import type { ClimateData } from "../types/weather";

declare const Chart: any;

const COLORS = ["#e74c3c", "#3498db", "#2ecc71"];
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export class ChartRenderer {
  private container: HTMLElement;
  private charts: any[] = [];

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`#${containerId} not found`);
    this.container = el;
  }

  public render(dataList: ClimateData[]) {
    // 既存チャートを破棄
    for (const c of this.charts) { c.destroy(); }
    this.charts = [];

    // 月ラベル生成（年月重複時は月のみに集約）
    const monthLabels = this.buildMonthLabels(dataList);

    this.container.innerHTML = `
      <div class="chart-grid">
        <div class="chart-item"><h3>平均気温</h3><canvas id="chart-temp"></canvas></div>
        <div class="chart-item"><h3>日照時間</h3><canvas id="chart-sun"></canvas></div>
        <div class="chart-item"><h3>湿度</h3><canvas id="chart-humid"></canvas></div>
        <div class="chart-item"><h3>降水量</h3><canvas id="chart-rain"></canvas></div>
        <div class="chart-item"><h3>風速</h3><canvas id="chart-wind"></canvas></div>
      </div>
    `;

    this.charts.push(this.line("chart-temp", monthLabels, dataList, s => s.avgTemp, "気温 (℃)"));
    this.charts.push(this.bar("chart-sun", monthLabels, dataList, s => s.totalSunshine, "日照 (h)"));
    // 湿度データが全都市で取得不可（Archive API 使用時）ならチャートをスキップ
    const hasHumidity = dataList.some(d => d.monthlyStats.some(s => !isNaN(s.avgHumidity)));
    if (hasHumidity) {
      this.charts.push(this.line("chart-humid", monthLabels, dataList, s => s.avgHumidity, "湿度 (%)", 0, 100));
    } else {
      const humidEl = document.getElementById("chart-humid")?.parentElement;
      if (humidEl) humidEl.innerHTML = "<h3>湿度</h3><p class='no-data'>Archive API では湿度データを取得できません</p>";
    }
    this.charts.push(this.bar("chart-rain", monthLabels, dataList, s => s.totalPrecipitation, "降水量 (mm)"));
    this.charts.push(this.line("chart-wind", monthLabels, dataList, s => s.avgWindSpeed, "風速 (m/s)"));
  }

  private buildMonthLabels(dataList: ClimateData[]): string[] {
    if (dataList.length === 0) return [];
    const stats = dataList[0].monthlyStats;
    return stats.map(s => `${s.year}/${s.month}月`);
  }

  private line(
    canvasId: string,
    labels: string[],
    dataList: ClimateData[],
    accessor: (s: ClimateData["monthlyStats"][0]) => number,
    yLabel: string,
    yMin?: number,
    yMax?: number
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    return new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: dataList.map((d, i) => ({
          label: d.cityName,
          data: d.monthlyStats.map(accessor),
          borderColor: COLORS[i],
          backgroundColor: COLORS[i] + "20",
          tension: 0.3
        }))
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" as const } },
        scales: {
          y: {
            title: { display: true, text: yLabel },
            ...(yMin !== undefined ? { min: yMin } : {}),
            ...(yMax !== undefined ? { max: yMax } : {})
          }
        }
      }
    });
  }

  private bar(
    canvasId: string,
    labels: string[],
    dataList: ClimateData[],
    accessor: (s: ClimateData["monthlyStats"][0]) => number,
    yLabel: string
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    return new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: dataList.map((d, i) => ({
          label: d.cityName,
          data: d.monthlyStats.map(accessor),
          backgroundColor: COLORS[i] + "80"
        }))
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" as const } },
        scales: {
          y: { title: { display: true, text: yLabel } }
        }
      }
    });
  }
}