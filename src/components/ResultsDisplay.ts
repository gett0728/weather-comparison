import type { ClimateData } from "../types/weather";
import { ChartRenderer } from "./ChartRenderer";

export class ResultsDisplay {
  private container: HTMLElement;
  private chartRenderer: ChartRenderer;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`#${containerId} not found`);
    this.container = el;
    this.init();
    this.chartRenderer = new ChartRenderer("results-charts");
  }

  private init() {
    this.container.innerHTML = `
      <h2>比較結果</h2>
      <div id="results-charts"></div>
      <div id="results-table"></div>
    `;
  }

  public show(dataList: ClimateData[]) {
    if (dataList.length === 0) {
      this.hide();
      return;
    }

    this.chartRenderer.render(dataList);
    this.renderTable(dataList);

    this.container.style.display = "block";
  }

  public hide() {
    this.container.style.display = "none";
  }

  private renderTable(dataList: ClimateData[]) {
    const tableEl = document.getElementById("results-table");
    if (!tableEl) return;

    tableEl.innerHTML = `
      <h3>月別詳細データ</h3>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>都市</th>
              <th>年月</th>
              <th>平均気温<br>(℃)</th>
              <th>最高気温<br>(℃)</th>
              <th>最低気温<br>(℃)</th>
              <th>日照時間<br>(h)</th>
              <th>降水量<br>(mm)</th>
              <th>湿度<br>(%)</th>
              <th>風速<br>(m/s)</th>
              <th>晴れ</th>
              <th>くもり</th>
              <th>雨</th>
            </tr>
          </thead>
          <tbody>
            ${dataList.map(d =>
              d.monthlyStats.map(s => `
                <tr>
                  <td><strong>${d.cityName}</strong></td>
                  <td>${s.year}/${s.month}月</td>
                  <td>${s.avgTemp}</td>
                  <td>${s.maxTemp}</td>
                  <td>${s.minTemp}</td>
                  <td>${s.totalSunshine}</td>
                  <td>${s.totalPrecipitation}</td>
                  <td>${isNaN(s.avgHumidity) ? "-" : s.avgHumidity}</td>
                  <td>${s.avgWindSpeed}</td>
                  <td>${s.sunnyDays}日</td>
                  <td>${s.cloudyDays}日</td>
                  <td>${s.rainyDays}日</td>
                </tr>
              `).join("")
            ).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}