import type { City, PrefectureGroup } from "../types/city";

const ALL_CITIES: City[] = [
  // 北海道
  { id: "sapporo",     name: "札幌",     prefecture: "北海道",   latitude: 43.0642, longitude: 141.3469 },
  { id: "asahikawa",   name: "旭川",     prefecture: "北海道",   latitude: 43.7709, longitude: 142.3650 },
  { id: "hakodate",    name: "函館",     prefecture: "北海道",   latitude: 41.7688, longitude: 140.7288 },
  { id: "kushiro",     name: "釧路",     prefecture: "北海道",   latitude: 42.9849, longitude: 144.3820 },

  // 東北
  { id: "aomori",      name: "青森",     prefecture: "青森県",   latitude: 40.8246, longitude: 140.7400 },
  { id: "morioka",     name: "盛岡",     prefecture: "岩手県",   latitude: 39.7036, longitude: 141.1527 },
  { id: "sendai",      name: "仙台",     prefecture: "宮城県",   latitude: 38.2682, longitude: 140.8694 },
  { id: "akita",       name: "秋田",     prefecture: "秋田県",   latitude: 39.7200, longitude: 140.1024 },
  { id: "yamagata",    name: "山形",     prefecture: "山形県",   latitude: 38.2405, longitude: 140.3633 },
  { id: "fukushima",   name: "福島",     prefecture: "福島県",   latitude: 37.7503, longitude: 140.4676 },

  // 関東
  { id: "mito",        name: "水戸",     prefecture: "茨城県",   latitude: 36.3415, longitude: 140.4468 },
  { id: "utsunomiya",  name: "宇都宮",   prefecture: "栃木県",   latitude: 36.5657, longitude: 139.8836 },
  { id: "maebashi",    name: "前橋",     prefecture: "群馬県",   latitude: 36.3912, longitude: 139.0608 },
  { id: "saitama",     name: "さいたま", prefecture: "埼玉県",   latitude: 35.8617, longitude: 139.6455 },
  { id: "chiba",       name: "千葉",     prefecture: "千葉県",   latitude: 35.6047, longitude: 140.1233 },
  { id: "tokyo",       name: "東京",     prefecture: "東京都",   latitude: 35.6762, longitude: 139.6503 },
  { id: "yokohama",    name: "横浜",     prefecture: "神奈川県", latitude: 35.4437, longitude: 139.6380 },
  { id: "kawasaki",    name: "川崎",     prefecture: "神奈川県", latitude: 35.5309, longitude: 139.7030 },

  // 中部
  { id: "niigata",     name: "新潟",     prefecture: "新潟県",   latitude: 37.9026, longitude: 139.0236 },
  { id: "toyama",      name: "富山",     prefecture: "富山県",   latitude: 36.6953, longitude: 137.2114 },
  { id: "kanazawa",    name: "金沢",     prefecture: "石川県",   latitude: 36.5947, longitude: 136.6256 },
  { id: "fukui",       name: "福井",     prefecture: "福井県",   latitude: 36.0652, longitude: 136.2219 },
  { id: "kofu",        name: "甲府",     prefecture: "山梨県",   latitude: 35.6642, longitude: 138.5684 },
  { id: "nagano",      name: "長野",     prefecture: "長野県",   latitude: 36.2378, longitude: 138.1812 },
  { id: "matsumoto",   name: "松本",     prefecture: "長野県",   latitude: 36.2380, longitude: 137.9720 },
  { id: "suwa",        name: "諏訪",     prefecture: "長野県",   latitude: 36.0392, longitude: 138.1140 },
  { id: "karuizawa",   name: "軽井沢",   prefecture: "長野県",   latitude: 36.3486, longitude: 138.5970 },
  { id: "gifu",        name: "岐阜",     prefecture: "岐阜県",   latitude: 35.3912, longitude: 136.7223 },
  { id: "takayama",    name: "高山",     prefecture: "岐阜県",   latitude: 36.1461, longitude: 137.2523 },
  { id: "shizuoka",    name: "静岡",     prefecture: "静岡県",   latitude: 34.9769, longitude: 138.3831 },
  { id: "hamamatsu",   name: "浜松",     prefecture: "静岡県",   latitude: 34.7108, longitude: 137.7261 },
  { id: "nagoya",      name: "名古屋",   prefecture: "愛知県",   latitude: 35.1815, longitude: 136.9066 },
  { id: "tsu",         name: "津",       prefecture: "三重県",   latitude: 34.7303, longitude: 136.5086 },
  { id: "yokkaichi",   name: "四日市",   prefecture: "三重県",   latitude: 34.9650, longitude: 136.6244 },

  // 近畿
  { id: "otsu",        name: "大津",     prefecture: "滋賀県",   latitude: 35.0045, longitude: 135.8686 },
  { id: "kyoto",       name: "京都",     prefecture: "京都府",   latitude: 35.0116, longitude: 135.7681 },
  { id: "osaka",       name: "大阪",     prefecture: "大阪府",   latitude: 34.6937, longitude: 135.5023 },
  { id: "kobe",        name: "神戸",     prefecture: "兵庫県",   latitude: 34.6901, longitude: 135.1956 },
  { id: "himeji",      name: "姫路",     prefecture: "兵庫県",   latitude: 34.8154, longitude: 134.6858 },
  { id: "nara",        name: "奈良",     prefecture: "奈良県",   latitude: 34.6851, longitude: 135.8049 },
  { id: "wakayama",    name: "和歌山",   prefecture: "和歌山県", latitude: 34.2261, longitude: 135.1675 },

  // 中国
  { id: "tottori",     name: "鳥取",     prefecture: "鳥取県",   latitude: 35.5011, longitude: 134.2351 },
  { id: "matsue",      name: "松江",     prefecture: "島根県",   latitude: 35.4723, longitude: 133.0505 },
  { id: "okayama",     name: "岡山",     prefecture: "岡山県",   latitude: 34.6618, longitude: 133.9349 },
  { id: "kurashiki",   name: "倉敷",     prefecture: "岡山県",   latitude: 34.5850, longitude: 133.7720 },
  { id: "hiroshima",   name: "広島",     prefecture: "広島県",   latitude: 34.3966, longitude: 132.4596 },
  { id: "yamaguchi",   name: "山口",     prefecture: "山口県",   latitude: 34.1861, longitude: 131.4706 },

  // 四国
  { id: "tokushima",   name: "徳島",     prefecture: "徳島県",   latitude: 34.0658, longitude: 134.5593 },
  { id: "takamatsu",   name: "高松",     prefecture: "香川県",   latitude: 34.3401, longitude: 134.0434 },
  { id: "matsuyama",   name: "松山",     prefecture: "愛媛県",   latitude: 33.8416, longitude: 132.7657 },
  { id: "kochi",       name: "高知",     prefecture: "高知県",   latitude: 33.5597, longitude: 133.5311 },

  // 九州・沖縄
  { id: "fukuoka",     name: "福岡",     prefecture: "福岡県",   latitude: 33.5904, longitude: 130.4017 },
  { id: "kitakyushu",  name: "北九州",   prefecture: "福岡県",   latitude: 33.8835, longitude: 130.8752 },
  { id: "saga",        name: "佐賀",     prefecture: "佐賀県",   latitude: 33.2635, longitude: 130.3009 },
  { id: "nagasaki",    name: "長崎",     prefecture: "長崎県",   latitude: 32.7503, longitude: 129.8777 },
  { id: "kumamoto",    name: "熊本",     prefecture: "熊本県",   latitude: 32.7898, longitude: 130.7417 },
  { id: "oita",        name: "大分",     prefecture: "大分県",   latitude: 33.2382, longitude: 131.6126 },
  { id: "miyazaki",    name: "宮崎",     prefecture: "宮崎県",   latitude: 31.9111, longitude: 131.4239 },
  { id: "kagoshima",   name: "鹿児島",   prefecture: "鹿児島県", latitude: 31.5602, longitude: 130.5581 },
  { id: "naha",        name: "那覇",     prefecture: "沖縄県",   latitude: 26.2124, longitude: 127.6809 },
  { id: "ishigaki",    name: "石垣島",   prefecture: "沖縄県",   latitude: 24.3448, longitude: 124.1572 }
];

export function getAllCities(): City[] {
  return ALL_CITIES;
}

export function getCityById(id: string): City | undefined {
  return ALL_CITIES.find(c => c.id === id);
}

export function getGroupedByPrefecture(): PrefectureGroup[] {
  const map = new Map<string, City[]>();

  for (const city of ALL_CITIES) {
    const list = map.get(city.prefecture) ?? [];
    list.push(city);
    map.set(city.prefecture, list);
  }

  const groups: PrefectureGroup[] = [];
  for (const [prefecture, cities] of map) {
    groups.push({ prefecture, cities });
  }
  return groups;
}