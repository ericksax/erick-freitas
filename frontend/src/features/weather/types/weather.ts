interface WeatherLocation {
  city: string | null;
  latitude: number;
  longitude: number;
  _id: string;
}

interface WeatherCurrent {
  time: string;
  temp: number;
  windspeed: number;
  winddirection: number;
  humidity: number;
  cloud: number;
  rain: number;
  _id: string;
}

interface WeatherDaily {
  date: string;
  min: number;
  max: number;
  _id: string;
}

interface ForecastHourly {
  time: string;
  temp: number;
  humidity: number;
  cloud: number;
  rain: number;
  _id: string;
}

interface WeatherDocument {
  _id: string;
  source: string;
  location: WeatherLocation;
  observed_at: string;
  current?: WeatherCurrent;
  forecast_hourly: ForecastHourly[];
  forecast_daily: WeatherDaily[];
  __v: number;
}

interface CurrentDayCardProps {
  current?: WeatherCurrent;
}

export {
  type CurrentDayCardProps,
  type WeatherCurrent,
  type WeatherDaily,
  type WeatherDocument,
  type WeatherLocation,
  type ForecastHourly,
};
