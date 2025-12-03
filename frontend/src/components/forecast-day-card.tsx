import { Sun, Thermometer } from "lucide-react";
import { WeatherDaily } from "./current-day-card";

export function ForecastDayCard({ date, min, max }: WeatherDaily) {
  return (
    <div className="flex h-full flex-col flex-1 bg-[#1A1D23] rounded-2xl p-4 items-center justify-around">
      <div className="flex items-center gap-2">
        <Sun size={20} className="text-yellow-400" />
        <strong className="font-semibold text-sm">
          {new Intl.DateTimeFormat("pt-br", { weekday: "short" })
            .format(new Date(date))
            .toUpperCase()}
        </strong>
      </div>
      <Thermometer size={62} className="text-gray-400" />
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-200">Max</span>
          <span className="font-bold text-gray-200 text-2xl">{max ?? "-"}°</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Min</span>
          <span className="text-gray-400 text-lg">{min ?? "-"}°</span>
        </div>
      </div>
    </div>
  );
}