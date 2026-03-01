import type { Period } from "../types/weather";
import { generateYearMonthOptions, getDefaultPeriod } from "../utils/dateUtils";

export class PeriodSelector {
  private container: HTMLElement;
  private period: Period;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`#${containerId} not found`);
    this.container = el;
    this.period = getDefaultPeriod();
    this.render();
  }

  private render() {
    const options = generateYearMonthOptions();

    const startOptions = options.map(o => {
      const val = `${o.year}-${o.month}`;
      const selected = (o.year === this.period.startYear && o.month === this.period.startMonth) ? "selected" : "";
      return `<option value="${val}" ${selected}>${o.label}</option>`;
    }).join("");

    const endOptions = options.map(o => {
      const val = `${o.year}-${o.month}`;
      const selected = (o.year === this.period.endYear && o.month === this.period.endMonth) ? "selected" : "";
      return `<option value="${val}" ${selected}>${o.label}</option>`;
    }).join("");

    this.container.innerHTML = `
      <div class="period-controls">
        <label>
          <select id="period-start">${startOptions}</select>
        </label>
        <span class="period-separator">〜</span>
        <label>
          <select id="period-end">${endOptions}</select>
        </label>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    const startSel = this.container.querySelector("#period-start") as HTMLSelectElement;
    const endSel = this.container.querySelector("#period-end") as HTMLSelectElement;

    startSel.addEventListener("change", () => this.updatePeriod(startSel, endSel));
    endSel.addEventListener("change", () => this.updatePeriod(startSel, endSel));
  }

  private updatePeriod(startSel: HTMLSelectElement, endSel: HTMLSelectElement) {
    const [sy, sm] = startSel.value.split("-").map(Number);
    const [ey, em] = endSel.value.split("-").map(Number);
    this.period = { startYear: sy, startMonth: sm, endYear: ey, endMonth: em };
  }

  public getPeriod(): Period {
    return { ...this.period };
  }
}