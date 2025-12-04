import {
  CurrentDayCard,
  WeatherDocument,
} from "../components/current-day-card";
import { ForecastDayCard } from "../components/forecast-day-card";
import { Header } from "../components/header";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { TemperatureHumidityChart } from "../components/charts/temperature-humidity-chart";

export interface WeatherApiResponse {
  message: string;
  success: boolean;
  data: WeatherDocument;
}

export function Dashboard() {
  const { data: result, isLoading, error } = useQuery<WeatherApiResponse>({
    queryKey: ["weather"],
    queryFn: () =>
      api.get<WeatherApiResponse>("/weather/last").then((res) => res.data),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar clima</p>;
  if (!result?.data) return <p>Nenhum dado encontrado</p>;

  const weather = result.data;

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-40 min-h-screen rounded-2xl p-8">
        <div className="h-full w-full flex flex-1 flex-col gap-8">
          <div className="flex flex-col lg:flex-row min-w-full gap-8">
            <CurrentDayCard
              key={weather.current?._id}
              current={weather.current}
            />

            <div className="flex flex-1 flex-wrap justify-center gap-4">
              {weather.forecast_daily.slice(2, 6).map((day) => (
                <ForecastDayCard key={day._id} {...day} />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-full w-full gap-8">
            <div className="flex-1 flex flex-col bg-[#1A1D23] rounded-2xl p-4">
              <TemperatureHumidityChart data={weather.forecast_hourly} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}  
