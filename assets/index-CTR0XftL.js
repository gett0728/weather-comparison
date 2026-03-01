(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const C=[{id:"sapporo",name:"札幌",prefecture:"北海道",latitude:43.0642,longitude:141.3469},{id:"asahikawa",name:"旭川",prefecture:"北海道",latitude:43.7709,longitude:142.365},{id:"hakodate",name:"函館",prefecture:"北海道",latitude:41.7688,longitude:140.7288},{id:"kushiro",name:"釧路",prefecture:"北海道",latitude:42.9849,longitude:144.382},{id:"aomori",name:"青森",prefecture:"青森県",latitude:40.8246,longitude:140.74},{id:"morioka",name:"盛岡",prefecture:"岩手県",latitude:39.7036,longitude:141.1527},{id:"sendai",name:"仙台",prefecture:"宮城県",latitude:38.2682,longitude:140.8694},{id:"akita",name:"秋田",prefecture:"秋田県",latitude:39.72,longitude:140.1024},{id:"yamagata",name:"山形",prefecture:"山形県",latitude:38.2405,longitude:140.3633},{id:"fukushima",name:"福島",prefecture:"福島県",latitude:37.7503,longitude:140.4676},{id:"mito",name:"水戸",prefecture:"茨城県",latitude:36.3415,longitude:140.4468},{id:"utsunomiya",name:"宇都宮",prefecture:"栃木県",latitude:36.5657,longitude:139.8836},{id:"maebashi",name:"前橋",prefecture:"群馬県",latitude:36.3912,longitude:139.0608},{id:"saitama",name:"さいたま",prefecture:"埼玉県",latitude:35.8617,longitude:139.6455},{id:"chiba",name:"千葉",prefecture:"千葉県",latitude:35.6047,longitude:140.1233},{id:"tokyo",name:"東京",prefecture:"東京都",latitude:35.6762,longitude:139.6503},{id:"yokohama",name:"横浜",prefecture:"神奈川県",latitude:35.4437,longitude:139.638},{id:"kawasaki",name:"川崎",prefecture:"神奈川県",latitude:35.5309,longitude:139.703},{id:"niigata",name:"新潟",prefecture:"新潟県",latitude:37.9026,longitude:139.0236},{id:"toyama",name:"富山",prefecture:"富山県",latitude:36.6953,longitude:137.2114},{id:"kanazawa",name:"金沢",prefecture:"石川県",latitude:36.5947,longitude:136.6256},{id:"fukui",name:"福井",prefecture:"福井県",latitude:36.0652,longitude:136.2219},{id:"kofu",name:"甲府",prefecture:"山梨県",latitude:35.6642,longitude:138.5684},{id:"nagano",name:"長野",prefecture:"長野県",latitude:36.2378,longitude:138.1812},{id:"matsumoto",name:"松本",prefecture:"長野県",latitude:36.238,longitude:137.972},{id:"suwa",name:"諏訪",prefecture:"長野県",latitude:36.0392,longitude:138.114},{id:"karuizawa",name:"軽井沢",prefecture:"長野県",latitude:36.3486,longitude:138.597},{id:"gifu",name:"岐阜",prefecture:"岐阜県",latitude:35.3912,longitude:136.7223},{id:"takayama",name:"高山",prefecture:"岐阜県",latitude:36.1461,longitude:137.2523},{id:"shizuoka",name:"静岡",prefecture:"静岡県",latitude:34.9769,longitude:138.3831},{id:"hamamatsu",name:"浜松",prefecture:"静岡県",latitude:34.7108,longitude:137.7261},{id:"nagoya",name:"名古屋",prefecture:"愛知県",latitude:35.1815,longitude:136.9066},{id:"tsu",name:"津",prefecture:"三重県",latitude:34.7303,longitude:136.5086},{id:"yokkaichi",name:"四日市",prefecture:"三重県",latitude:34.965,longitude:136.6244},{id:"otsu",name:"大津",prefecture:"滋賀県",latitude:35.0045,longitude:135.8686},{id:"kyoto",name:"京都",prefecture:"京都府",latitude:35.0116,longitude:135.7681},{id:"osaka",name:"大阪",prefecture:"大阪府",latitude:34.6937,longitude:135.5023},{id:"kobe",name:"神戸",prefecture:"兵庫県",latitude:34.6901,longitude:135.1956},{id:"himeji",name:"姫路",prefecture:"兵庫県",latitude:34.8154,longitude:134.6858},{id:"nara",name:"奈良",prefecture:"奈良県",latitude:34.6851,longitude:135.8049},{id:"wakayama",name:"和歌山",prefecture:"和歌山県",latitude:34.2261,longitude:135.1675},{id:"tottori",name:"鳥取",prefecture:"鳥取県",latitude:35.5011,longitude:134.2351},{id:"matsue",name:"松江",prefecture:"島根県",latitude:35.4723,longitude:133.0505},{id:"okayama",name:"岡山",prefecture:"岡山県",latitude:34.6618,longitude:133.9349},{id:"kurashiki",name:"倉敷",prefecture:"岡山県",latitude:34.585,longitude:133.772},{id:"hiroshima",name:"広島",prefecture:"広島県",latitude:34.3966,longitude:132.4596},{id:"yamaguchi",name:"山口",prefecture:"山口県",latitude:34.1861,longitude:131.4706},{id:"tokushima",name:"徳島",prefecture:"徳島県",latitude:34.0658,longitude:134.5593},{id:"takamatsu",name:"高松",prefecture:"香川県",latitude:34.3401,longitude:134.0434},{id:"matsuyama",name:"松山",prefecture:"愛媛県",latitude:33.8416,longitude:132.7657},{id:"kochi",name:"高知",prefecture:"高知県",latitude:33.5597,longitude:133.5311},{id:"fukuoka",name:"福岡",prefecture:"福岡県",latitude:33.5904,longitude:130.4017},{id:"kitakyushu",name:"北九州",prefecture:"福岡県",latitude:33.8835,longitude:130.8752},{id:"saga",name:"佐賀",prefecture:"佐賀県",latitude:33.2635,longitude:130.3009},{id:"nagasaki",name:"長崎",prefecture:"長崎県",latitude:32.7503,longitude:129.8777},{id:"kumamoto",name:"熊本",prefecture:"熊本県",latitude:32.7898,longitude:130.7417},{id:"oita",name:"大分",prefecture:"大分県",latitude:33.2382,longitude:131.6126},{id:"miyazaki",name:"宮崎",prefecture:"宮崎県",latitude:31.9111,longitude:131.4239},{id:"kagoshima",name:"鹿児島",prefecture:"鹿児島県",latitude:31.5602,longitude:130.5581},{id:"naha",name:"那覇",prefecture:"沖縄県",latitude:26.2124,longitude:127.6809},{id:"ishigaki",name:"石垣島",prefecture:"沖縄県",latitude:24.3448,longitude:124.1572}];function I(){const a=new Map;for(const n of C){const i=a.get(n.prefecture)??[];i.push(n),a.set(n.prefecture,i)}const e=[];for(const[n,i]of a)e.push({prefecture:n,cities:i});return e}const g=3;class P{constructor(e,n){this.selected=new Set,this.allCitiesMap=new Map;const i=document.getElementById(e);if(!i)throw new Error(`#${e} not found`);this.container=i,this.onChange=n;const t=I();for(const r of t)for(const o of r.cities)this.allCitiesMap.set(o.id,o);this.render(t)}render(e){this.container.innerHTML=`
      <div class="city-selector-controls">
        <label>
          都道府県で絞り込み:
          <select id="pref-filter">
            <option value="">すべて表示</option>
            ${e.map(n=>`<option value="${n.prefecture}">${n.prefecture}</option>`).join("")}
          </select>
          <button type="button" id="city-reset-btn" class="reset-btn">リセット</button>
        </label>
        <span id="selection-count" class="selection-count">0 / ${g} 選択中</span>
      </div>
      <div id="city-list" class="city-grid">
        ${e.map(n=>`
          <div class="pref-group" data-pref="${n.prefecture}">
            <h3 class="pref-name">${n.prefecture}</h3>
            <div class="pref-cities">
              ${n.cities.map(i=>`
                <label class="city-label">
                  <input type="checkbox" value="${i.id}" />
                  <span>${i.name}</span>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `,this.attachEvents()}attachEvents(){const e=this.container.querySelector("#pref-filter");e.addEventListener("change",()=>{const i=e.value,t=this.container.querySelectorAll(".pref-group");for(const r of t)r.style.display=!i||r.dataset.pref===i?"":"none"}),this.container.querySelector("#city-reset-btn").addEventListener("click",()=>{this.selected.clear();const i=this.container.querySelectorAll("input[type=checkbox]");for(const t of i)t.checked=!1;this.updateCount(),this.notify()}),this.container.addEventListener("change",i=>{const t=i.target;if(t.type!=="checkbox")return;const r=t.value;if(t.checked){if(this.selected.size>=g){t.checked=!1,alert(`最大${g}地点まで選択可能です`);return}this.selected.add(r)}else this.selected.delete(r);this.updateCount(),this.notify()})}updateCount(){const e=this.container.querySelector("#selection-count");e&&(e.textContent=`${this.selected.size} / ${g} 選択中`)}notify(){const e=[];for(const n of this.selected){const i=this.allCitiesMap.get(n);i&&e.push(i)}this.onChange(e)}getSelected(){const e=[];for(const n of this.selected){const i=this.allCitiesMap.get(n);i&&e.push(i)}return e}}function Y(a){const e=String(a.startMonth).padStart(2,"0");return`${a.startYear}-${e}-01`}function L(a){const e=new Date(a.endYear,a.endMonth,0).getDate(),n=String(a.endMonth).padStart(2,"0");return`${a.endYear}-${n}-${String(e).padStart(2,"0")}`}function N(a){const e=String(a.startMonth).padStart(2,"0"),n=String(a.endMonth).padStart(2,"0");return`${a.startYear}-${e}_${a.endYear}-${n}`}function O(a){return a.startYear<a.endYear?!0:a.startYear===a.endYear?a.startMonth<=a.endMonth:!1}function R(){const a=[],e=new Date,n=e.getFullYear(),i=e.getMonth();let t=240+i-1;for(t;t>=0;t--){let r=n,o=i-t;for(;o<=0;)o+=12,r--;a.push({year:r,month:o,label:`${r}年${o}月`})}return a}function H(){const a=new Date,e=new Date(a.getFullYear()-1,0),n=new Date(a.getFullYear()-1,11);return{startYear:e.getFullYear(),startMonth:e.getMonth()+1,endYear:n.getFullYear(),endMonth:n.getMonth()+1}}class x{constructor(e){const n=document.getElementById(e);if(!n)throw new Error(`#${e} not found`);this.container=n,this.period=H(),this.render()}render(){const e=R(),n=e.map(t=>{const r=`${t.year}-${t.month}`,o=t.year===this.period.startYear&&t.month===this.period.startMonth?"selected":"";return`<option value="${r}" ${o}>${t.label}</option>`}).join(""),i=e.map(t=>{const r=`${t.year}-${t.month}`,o=t.year===this.period.endYear&&t.month===this.period.endMonth?"selected":"";return`<option value="${r}" ${o}>${t.label}</option>`}).join("");this.container.innerHTML=`
      <div class="period-controls">
        <label>
          <select id="period-start">${n}</select>
        </label>
        <span class="period-separator">〜</span>
        <label>
          <select id="period-end">${i}</select>
        </label>
      </div>
    `,this.attachEvents()}attachEvents(){const e=this.container.querySelector("#period-start"),n=this.container.querySelector("#period-end");e.addEventListener("change",()=>this.updatePeriod(e,n)),n.addEventListener("change",()=>this.updatePeriod(e,n))}updatePeriod(e,n){const[i,t]=e.value.split("-").map(Number),[r,o]=n.value.split("-").map(Number);this.period={startYear:i,startMonth:t,endYear:r,endMonth:o}}getPeriod(){return{...this.period}}}const _=["#e74c3c","#3498db","#2ecc71"];class B{constructor(e){this.charts=[];const n=document.getElementById(e);if(!n)throw new Error(`#${e} not found`);this.container=n}render(e){var t;for(const r of this.charts)r.destroy();this.charts=[];const n=this.buildMonthLabels(e);if(this.container.innerHTML=`
      <div class="chart-grid">
        <div class="chart-item"><h3>平均気温</h3><canvas id="chart-temp"></canvas></div>
        <div class="chart-item"><h3>日照時間</h3><canvas id="chart-sun"></canvas></div>
        <div class="chart-item"><h3>湿度</h3><canvas id="chart-humid"></canvas></div>
        <div class="chart-item"><h3>降水量</h3><canvas id="chart-rain"></canvas></div>
        <div class="chart-item"><h3>風速</h3><canvas id="chart-wind"></canvas></div>
      </div>
    `,this.charts.push(this.line("chart-temp",n,e,r=>r.avgTemp,"気温 (℃)")),this.charts.push(this.bar("chart-sun",n,e,r=>r.totalSunshine,"日照 (h)")),e.some(r=>r.monthlyStats.some(o=>!isNaN(o.avgHumidity))))this.charts.push(this.line("chart-humid",n,e,r=>r.avgHumidity,"湿度 (%)",0,100));else{const r=(t=document.getElementById("chart-humid"))==null?void 0:t.parentElement;r&&(r.innerHTML="<h3>💧 湿度</h3><p class='no-data'>Archive API では湿度データを取得できません</p>")}this.charts.push(this.bar("chart-rain",n,e,r=>r.totalPrecipitation,"降水量 (mm)")),this.charts.push(this.line("chart-wind",n,e,r=>r.avgWindSpeed,"風速 (m/s)"))}buildMonthLabels(e){return e.length===0?[]:e[0].monthlyStats.map(i=>`${i.year}/${i.month}月`)}line(e,n,i,t,r,o,c){const d=document.getElementById(e);return new Chart(d,{type:"line",data:{labels:n,datasets:i.map((h,u)=>({label:h.cityName,data:h.monthlyStats.map(t),borderColor:_[u],backgroundColor:_[u]+"20",tension:.3}))},options:{responsive:!0,plugins:{legend:{position:"top"}},scales:{y:{title:{display:!0,text:r},...o!==void 0?{min:o}:{},...c!==void 0?{max:c}:{}}}}})}bar(e,n,i,t,r){const o=document.getElementById(e);return new Chart(o,{type:"bar",data:{labels:n,datasets:i.map((c,d)=>({label:c.cityName,data:c.monthlyStats.map(t),backgroundColor:_[d]+"80"}))},options:{responsive:!0,plugins:{legend:{position:"top"}},scales:{y:{title:{display:!0,text:r}}}}})}}class j{constructor(e){const n=document.getElementById(e);if(!n)throw new Error(`#${e} not found`);this.container=n,this.init(),this.chartRenderer=new B("results-charts")}init(){this.container.innerHTML=`
      <h2>比較結果</h2>
      <div id="results-charts"></div>
      <div id="results-table"></div>
    `}show(e){if(e.length===0){this.hide();return}this.chartRenderer.render(e),this.renderTable(e),this.container.style.display="block"}hide(){this.container.style.display="none"}renderTable(e){const n=document.getElementById("results-table");n&&(n.innerHTML=`
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
            ${e.map(i=>i.monthlyStats.map(t=>`
                <tr>
                  <td><strong>${i.cityName}</strong></td>
                  <td>${t.year}/${t.month}月</td>
                  <td>${t.avgTemp}</td>
                  <td>${t.maxTemp}</td>
                  <td>${t.minTemp}</td>
                  <td>${t.totalSunshine}</td>
                  <td>${t.totalPrecipitation}</td>
                  <td>${isNaN(t.avgHumidity)?"-":t.avgHumidity}</td>
                  <td>${t.avgWindSpeed}</td>
                  <td>${t.sunnyDays}日</td>
                  <td>${t.cloudyDays}日</td>
                  <td>${t.rainyDays}日</td>
                </tr>
              `).join("")).join("")}
          </tbody>
        </table>
      </div>
    `)}}const F="https://api.open-meteo.com/v1/forecast",q="https://archive-api.open-meteo.com/v1/archive",z=1e4,U=92,W=["temperature_2m_max","temperature_2m_min","temperature_2m_mean","precipitation_sum","sunshine_duration","wind_speed_10m_max","relative_humidity_2m_mean","weather_code"].join(","),K=["temperature_2m_max","temperature_2m_min","precipitation_sum","sunshine_duration","wind_speed_10m_max","weather_code"].join(",");function X(a){const e=new Date(a),n=new Date;return n.setHours(0,0,0,0),(n.getTime()-e.getTime())/(1e3*60*60*24)>U}async function J(a,e){const n=Y(e),i=L(e),t=X(n),r=t?q:F,o=t?K:W,c=new URLSearchParams({latitude:a.latitude.toString(),longitude:a.longitude.toString(),daily:o,start_date:n,end_date:i,timezone:"Asia/Tokyo"}),d=new AbortController,h=setTimeout(()=>d.abort(),z);try{const u=`${r}?${c}`;console.log(`[Weather API] ${t?"Archive":"Forecast"} Request URL: ${u}`);const m=await fetch(u,{signal:d.signal});if(!m.ok)throw new Error(`API error: ${m.status}`);const b=await m.json(),S=V(b.daily);return{cityId:a.id,cityName:a.name,prefecture:a.prefecture,monthlyStats:S,period:{start:n,end:i}}}finally{clearTimeout(h)}}function V(a){const e=new Map;for(let i=0;i<a.time.length;i++){const t=new Date(a.time[i]),r=`${t.getFullYear()}-${t.getMonth()+1}`,o=e.get(r)??[];o.push(i),e.set(r,o)}const n=[];for(const[i,t]of e){const[r,o]=i.split("-");t.length;const c=p(t.map(s=>a.temperature_2m_max[s])),d=p(t.map(s=>a.temperature_2m_min[s])),h=a.temperature_2m_mean?p(t.map(s=>a.temperature_2m_mean[s])):l((c+d)/2),u=E(t.map(s=>a.sunshine_duration[s]))/3600,m=E(t.map(s=>a.precipitation_sum[s])),b=a.relative_humidity_2m_mean?p(t.map(s=>a.relative_humidity_2m_mean[s])):NaN,S=p(t.map(s=>a.wind_speed_10m_max[s]));let $=0,w=0,k=0;for(const s of t){const f=a.weather_code[s];f<=1?$++:f<=3||f===45||f===48?w++:k++}n.push({year:Number(r),month:Number(o),avgTemp:l(h),maxTemp:l(c),minTemp:l(d),totalSunshine:l(u),totalPrecipitation:l(m),avgHumidity:l(b),avgWindSpeed:l(S),sunnyDays:$,cloudyDays:w,rainyDays:k})}return n.sort((i,t)=>i.year!==t.year?i.year-t.year:i.month-t.month),n}function p(a){return a.length===0?0:a.reduce((e,n)=>e+n,0)/a.length}function E(a){return a.reduce((e,n)=>e+n,0)}function l(a){return Math.round(a*10)/10}const D="weather_",G=5,Q=24*60*60*1e3;function A(a,e){return`${D}${a}_${e}`}function Z(){const a=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n!=null&&n.startsWith(D)&&a.push(n)}return a}function ee(a,e){const n=A(a,e),i=localStorage.getItem(n);if(!i)return null;try{const t=JSON.parse(i);return Date.now()-t.timestamp>Q?(localStorage.removeItem(n),null):t.data}catch{return localStorage.removeItem(n),null}}function te(a,e,n){ne();const i=A(a,e),t={cityId:a,period:e,data:n,timestamp:Date.now()};try{localStorage.setItem(i,JSON.stringify(t))}catch{}}function ne(){const a=Z();if(a.length<G)return;let e=a[0],n=1/0;for(const i of a)try{const t=JSON.parse(localStorage.getItem(i));t.timestamp<n&&(n=t.timestamp,e=i)}catch{localStorage.removeItem(i);return}localStorage.removeItem(e)}const y=document.getElementById("compare-btn"),M=document.getElementById("loading");let v=[];new P("city-selector",a=>{v=a,y.disabled=a.length===0});const ae=new x("period-selector"),T=new j("results");y.addEventListener("click",async()=>{if(v.length===0){alert("地点を選択してください");return}const a=ae.getPeriod();if(!O(a)){alert("開始日は終了日より前に設定してください");return}const e=N(a);try{M.style.display="block",T.hide(),y.disabled=!0;const n=await Promise.all(v.map(async i=>{const t=ee(i.id,e);if(t)return t;const r=await J(i,a);return te(i.id,e,r),r}));T.show(n)}catch(n){console.error(n),alert("気象データの取得に失敗しました。しばらく経ってから再度お試しください。")}finally{M.style.display="none",y.disabled=v.length===0}});
