export interface WeatherHourlyDTO {
  time: string[];
  temperature: number[]; // hourly.temperature_2m
  humidity: number[];
  cloudCover: number[];
  precipProb: number[];
}

export interface WeatherDailyDTO {
  date: string;
  temp_min: number | null;
  temp_max: number | null;
  humidity_avg: number | null;
  cloud_avg: number | null;
  precip_avg: number | null;
}

export interface WeatherLogDTO {
  id: string;

  source: string;

  location: {
    city: string | null;
    latitude: number;
    longitude: number;
  };

  observed_at: string; // ISO date

  temperature_c: number | null; // temperatura atual
  humidity_percent: number | null;
  wind_speed_m_s: number | null;
  wind_direction_deg: number | null;
  cloud_cover_percent: number | null;
  precipitation_probability: number | null;

  hourly: WeatherHourlyDTO; // série horária normalizada

  daily: WeatherDailyDTO[]; // forecast diário limpo
}
