import type { City } from "../types/city";
import { getGroupedByPrefecture } from "../data/cities";

const MAX_SELECTION = 3;

export class CitySelector {
  private container: HTMLElement;
  private selected: Set<string> = new Set();
  private onChange: (cities: City[]) => void;
  private allCitiesMap: Map<string, City> = new Map();

  constructor(containerId: string, onChange: (cities: City[]) => void) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`#${containerId} not found`);
    this.container = el;
    this.onChange = onChange;

    const groups = getGroupedByPrefecture();
    for (const g of groups) {
      for (const c of g.cities) {
        this.allCitiesMap.set(c.id, c);
      }
    }

    this.render(groups);
  }

  private render(groups: { prefecture: string; cities: City[] }[]) {
    this.container.innerHTML = `
      <div class="city-selector-controls">
        <label>
          都道府県で絞り込み:
          <select id="pref-filter">
            <option value="">すべて表示</option>
            ${groups.map(g => `<option value="${g.prefecture}">${g.prefecture}</option>`).join("")}
          </select>
          <button type="button" id="city-reset-btn" class="reset-btn">リセット</button>
        </label>
        <span id="selection-count" class="selection-count">0 / ${MAX_SELECTION} 選択中</span>
      </div>
      <div id="city-list" class="city-grid">
        ${groups.map(g => `
          <div class="pref-group" data-pref="${g.prefecture}">
            <h3 class="pref-name">${g.prefecture}</h3>
            <div class="pref-cities">
              ${g.cities.map(c => `
                <label class="city-label">
                  <input type="checkbox" value="${c.id}" />
                  <span>${c.name}</span>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // 都道府県フィルタ
    const filter = this.container.querySelector("#pref-filter") as HTMLSelectElement;
    filter.addEventListener("change", () => {
      const val = filter.value;
      const groups = this.container.querySelectorAll<HTMLElement>(".pref-group");
      for (const g of groups) {
        g.style.display = (!val || g.dataset.pref === val) ? "" : "none";
      }
    });

    // リセットボタン
    const resetBtn = this.container.querySelector("#city-reset-btn") as HTMLButtonElement;
    resetBtn.addEventListener("click", () => {
      this.selected.clear();
      const checkboxes = this.container.querySelectorAll<HTMLInputElement>("input[type=checkbox]");
      for (const cb of checkboxes) cb.checked = false;
      this.updateCount();
      this.notify();
    });

    // チェックボックス
    this.container.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.type !== "checkbox") return;

      const cityId = target.value;

      if (target.checked) {
        if (this.selected.size >= MAX_SELECTION) {
          target.checked = false;
          alert(`最大${MAX_SELECTION}地点まで選択可能です`);
          return;
        }
        this.selected.add(cityId);
      } else {
        this.selected.delete(cityId);
      }

      this.updateCount();
      this.notify();
    });
  }

  private updateCount() {
    const el = this.container.querySelector("#selection-count");
    if (el) el.textContent = `${this.selected.size} / ${MAX_SELECTION} 選択中`;
  }

  private notify() {
    const cities: City[] = [];
    for (const id of this.selected) {
      const c = this.allCitiesMap.get(id);
      if (c) cities.push(c);
    }
    this.onChange(cities);
  }

  public getSelected(): City[] {
    const cities: City[] = [];
    for (const id of this.selected) {
      const c = this.allCitiesMap.get(id);
      if (c) cities.push(c);
    }
    return cities;
  }
}