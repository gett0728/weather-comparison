import "./styles/main.css";
import { CitySelector } from "./components/CitySelector";
import { PeriodSelector } from "./components/PeriodSelector";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { fetchClimateData } from "./api/weatherAPI";
import { getCachedData, setCachedData } from "./utils/cache";
import { periodToKey, isValidPeriod } from "./utils/dateUtils";
import type { City } from "./types/city";
import type { ClimateData } from "./types/weather";

// --- DOM要素 ---
const compareBtn = document.getElementById("compare-btn") as HTMLButtonElement;
const loadingEl = document.getElementById("loading") as HTMLElement;

// --- コンポーネント初期化 ---
let selectedCities: City[] = [];

const citySelector = new CitySelector("city-selector", (cities) => {
  selectedCities = cities;
  compareBtn.disabled = cities.length === 0;
});

const periodSelector = new PeriodSelector("period-selector");
const resultsDisplay = new ResultsDisplay("results");

// --- 比較実行 ---
compareBtn.addEventListener("click", async () => {
  if (selectedCities.length === 0) {
    alert("地点を選択してください");
    return;
  }

  const period = periodSelector.getPeriod();
  if (!isValidPeriod(period)) {
    alert("開始日は終了日より前に設定してください");
    return;
  }

  const pKey = periodToKey(period);

  try {
    loadingEl.style.display = "block";
    resultsDisplay.hide();
    compareBtn.disabled = true;

    const results: ClimateData[] = await Promise.all(
      selectedCities.map(async (city) => {
        // キャッシュ確認
        const cached = getCachedData(city.id, pKey);
        if (cached) return cached;

        // API取得
        const data = await fetchClimateData(city, period);
        setCachedData(city.id, pKey, data);
        return data;
      })
    );

    resultsDisplay.show(results);
  } catch (err) {
    console.error(err);
    alert("気象データの取得に失敗しました。しばらく経ってから再度お試しください。");
  } finally {
    loadingEl.style.display = "none";
    compareBtn.disabled = selectedCities.length === 0;
  }
});