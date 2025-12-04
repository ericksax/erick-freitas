import {
  CalendarDays,
  Cloud,
  CloudRain,
  Compass,
  Droplets,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";

export interface WeatherLocation {
  city: string | null;
  latitude: number;
  longitude: number;
  _id: string;
}

export interface WeatherCurrent {
  time: string;
  temp: number;
  windspeed: number;
  winddirection: number;
  humidity: number;
  cloud: number;
  rain: number;
  _id: string;
}

export interface WeatherDaily {
  date: string;
  min: number;
  max: number;
  _id:string;
}

export interface ForecastHourly {
  time: string;
  temp: number;
  humidity: number;
  cloud: number;
  rain: number;
  _id: string;
}

export interface WeatherDocument {
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

export function CurrentDayCard({ current }: CurrentDayCardProps) {
  const weatherData = [
    {
      label: "Temp.",
      value: current?.temp,
      unit: "°C",
      Icon: Thermometer,
      highlight: true,
    },
    {
      label: "Umidade",
      value: current?.humidity,
      unit: "%",
      Icon: Droplets,
    },
    {
      label: "Vento",
      value: current?.windspeed,
      unit: "km/h",
      Icon: Wind,
    },
    {
      label: "Direção V.",
      value: current?.winddirection,
      unit: "°",
      Icon: Compass,
    },
    {
      label: "Nuvens",
      value: current?.cloud,
      unit: "%",
      Icon: Cloud,
    },
    {
      label: "Chuva",
      value: current?.rain,
      unit: "mm",
      Icon: CloudRain,
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-[#1A1D23] w-full lg:w-[40%] rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
            <MapPin className="text-red-400 h-6 w-4" />
            <strong className="font-semibold text-lg">Juiz de Fora - MG </strong></div>
        <span className="flex items-center gap-2">
            <CalendarDays className="text-gray-300 w-4 h-4"/>
          {current?.time
            ? new Intl.DateTimeFormat("pt-br", {
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date(current.time))
            : "..."}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {weatherData.map(({ label, value, unit, Icon, highlight }) => {
          if (highlight) {
            return (
              <div
                key={label}
                className="flex flex-row items-center justify-center gap-2 p-3 rounded-lg bg-emerald-700 text-emerald-950 col-span-2 sm:col-span-3"
              >
                <Icon className="w-auto h-[clamp(2rem,5vw,2.5rem)] text-emerald-950" />
                <strong className="font-bold text-[clamp(2rem,5vw,2.5rem)] leading-tight">
                  {value ?? "-"}
                  {unit}
                </strong>
              </div>
            );
          }
          return (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:gap-3 p-3 rounded-lg bg-black/20"
            >
              <Icon className="h-6 w-6 text-gray-300 shrink-0" />
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-sm text-gray-400">{label}</span>
                <strong className="font-bold text-sm">
                  {value ?? "-"}
                  {unit}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
