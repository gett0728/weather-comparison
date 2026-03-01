export interface City {
  id: string;
  name: string;
  prefecture: string;
  latitude: number;
  longitude: number;
}

export interface PrefectureGroup {
  prefecture: string;
  cities: City[];
}