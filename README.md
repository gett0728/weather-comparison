# 🌤️ 日本気象比較サイト

日本各地の気象データを比較し、引っ越し先の気候検討に役立てるWebアプリケーションです。

## 機能

- **50地点以上**の都市から最大3地点を選んで比較
- **任意の期間**（過去2年以内）を指定して月別データを比較
- 気温・日照時間・湿度・降水量・風速・天候日数をグラフ＆テーブル表示
- 直近5都市分のキャッシュ（LocalStorage、24時間有効）

## 技術スタック

- TypeScript + Vite
- Chart.js（CDN）
- Open-Meteo API（無料・APIキー不要）
- GitHub Pages

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/<your-username>/weather-comparison-site.git
cd weather-comparison-site

# 依存関係インストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev
```

## ビルド

```bash
npm run build
```

`dist/` ディレクトリに成果物が出力されます。

## GitHub Pages へデプロイ

```bash
npm run deploy
```

または手動：

```bash
npm run build
git add dist -f
git commit -m "deploy"
git subtree push --prefix dist origin gh-pages
```

公開URL: `https://<your-username>.github.io/weather-comparison-site/`

## 気象データについて

- データ提供: [Open-Meteo](https://open-meteo.com/)
- 天気コードは WMO 基準（0-1: 晴れ、2-3/45/48: 曇り、51以上: 雨/雪）
- データ精度は API 提供元に依存します