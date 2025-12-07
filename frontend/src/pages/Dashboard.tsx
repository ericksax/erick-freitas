import {
  CurrentDayCard,
  WeatherDocument,
} from "../components/current-day-card";
import { ForecastDayCard } from "../components/forecast-day-card";
import { Header } from "../components/header";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { TemperatureHumidityChart } from "../components/charts/temperature-humidity-chart";
import { AiInsights } from "@/components/ai-insights";

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

  if (isLoading) return <div className="h-screen flex justify-center items-center"><p>Carregando...</p></div>;
  if (error) return <div className="h-screen flex justify-center items-center"><p>Erro ao buscar clima</p></div>;
  if (!result?.data) return <div className="h-screen flex justify-center items-center"><p>Nenhum dado encontrado</p></div>;

  const weather = result.data;

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="min-h-screen rounded-2xl pt-[140px] md:pt-28">
        <div className="max-w-[1440px] mx-auto p-4 md:p-8">
          <div className="h-full w-full flex flex-1 flex-col gap-4">
            <div className="flex flex-col lg:flex-row min-w-full gap-4">
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

            
              <div className="flex-1 flex-col lg:flex-row flex-wrap flex bg-[#1A1D23] rounded-2xl p-2 md:p-4 items-center">
                <TemperatureHumidityChart data={weather.forecast_hourly} />
                <AiInsights/>
              </div>
            </div>
          </div>
        
      </main>
    </div>
  );
}  
